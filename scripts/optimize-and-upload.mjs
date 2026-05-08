/**
 * Otimiza mídia local e faz upload para Cloudflare R2 via S3 API:
 *   Imagens JPG/PNG → WebP  (qualidade 82)
 *   Vídeos MP4       → MP4 H.264 CRF-26 faststart, max 720p
 *
 * Usage: node scripts/optimize-and-upload.mjs
 * Requires: ffmpeg in PATH
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { spawnSync } from "child_process"
import { readdirSync, statSync, mkdirSync, existsSync, rmSync, readFileSync } from "fs"
import { join, extname, basename } from "path"
import { tmpdir } from "os"

const R2_ACCOUNT   = "0976ee0adac0062c726747d29549308e"
const R2_BUCKET    = "taina-aci"
const R2_BASE      = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"
const ACCESS_KEY   = "c7a00af948e48e3820475a89ab0ef3c7"
const SECRET_KEY   = "c973e847a4db1f7b54192c74b1105a1220fb347e2a560482640d08fae69775b6"

const FOLDER  = "C:\\Users\\rya_p\\Downloads\\DESTAQUE -TAINÃ ACI"
const TMP_DIR = join(tmpdir(), "taina-optimized")

const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".mp4":  "video/mp4",
  ".mov":  "video/quicktime",
  ".webm": "video/webm",
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
})

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true })

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "pipe", encoding: "utf8" })
  if (result.status !== 0) throw new Error(result.stderr?.slice(-300) ?? "ffmpeg failed")
}

const files = readdirSync(FOLDER)
  .map((name) => ({ name, stat: statSync(join(FOLDER, name)) }))
  .filter(({ stat, name }) => stat.isFile() && MIME[extname(name).toLowerCase()])
  .sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs)

const SMALL = 100_000
const stories = []
let ok = 0, fail = 0

console.log(`${files.length} arquivos | saída: ${TMP_DIR}\n`)

for (let i = 0; i < files.length; i++) {
  const { name, stat } = files[i]
  const ext     = extname(name).toLowerCase()
  const num     = String(i + 1).padStart(2, "0")
  const src     = join(FOLDER, name)
  const isImage = [".jpg", ".jpeg", ".png"].includes(ext)
  const isSmall = stat.size < SMALL

  if (isSmall) {
    console.log(`[${i + 1}/${files.length}] story-${num}${ext} — IGNORADO (${Math.round(stat.size / 1024)}KB)\n`)
    continue
  }

  const outExt      = isImage ? ".webp" : ".mp4"
  const r2Key       = `story-${num}${outExt}`
  const outPath     = join(TMP_DIR, r2Key)
  const contentType = isImage ? "image/webp" : "video/mp4"

  process.stdout.write(`[${i + 1}/${files.length}] ${r2Key} `)

  try {
    if (isImage) {
      ffmpeg(["-y", "-i", src, "-quality", "82", outPath])
    } else {
      ffmpeg([
        "-y", "-i", src,
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "fast",
        "-vf", "scale=trunc(min(720\\,iw)/2)*2:-2",
        "-movflags", "+faststart",
        "-an",
        outPath,
      ])
    }

    const origKB = Math.round(stat.size / 1024)
    const outKB  = Math.round(statSync(outPath).size / 1024)
    const pct    = Math.round((1 - outKB / origKB) * 100)

    process.stdout.write(`${origKB}KB → ${outKB}KB (-${pct}%) ... `)

    const body = readFileSync(outPath)
    await s3.send(new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: r2Key,
      Body: body,
      ContentType: contentType,
    }))

    const type = isImage ? "image" : "video"
    stories.push({ num: i + 1, type, r2Key })
    console.log("OK")
    ok++
  } catch (err) {
    console.log(`ERRO: ${err.message.slice(0, 200)}`)
    fail++
  }
}

rmSync(TMP_DIR, { recursive: true, force: true })

console.log(`\n✓ ${ok} enviados, ${fail} erros`)
console.log("\n=== Atualize instagram-stories.tsx ===\n")
console.log("const stories = [")
for (const s of stories) {
  console.log(`  { id: ${String(s.num).padStart(2)}, type: "${s.type}", url: \`\${BASE}/${s.r2Key}\` },`)
}
console.log("] as const")
