/**
 * Otimiza mídia local e faz upload para Cloudflare R2:
 *   Imagens JPG/PNG → WebP  (qualidade 82)
 *   Vídeos MP4       → MP4 H.264 CRF-26 faststart, max 720p largura
 *
 * Usage: node scripts/optimize-and-upload.mjs
 * Requires: ffmpeg in PATH, wrangler authenticated.
 */

import { execSync, spawnSync } from "child_process"
import { readdirSync, statSync, mkdirSync, existsSync, rmSync } from "fs"
import { join, extname, basename } from "path"
import { tmpdir } from "os"

const FOLDER    = "C:\\Users\\rya_p\\Downloads\\DESTAQUE -TAINÃ ACI"
const R2_BUCKET = "taina-aci"
const R2_BASE   = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"
const TMP_DIR   = join(tmpdir(), "taina-optimized")

const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".mp4":  "video/mp4",
  ".mov":  "video/quicktime",
  ".webm": "video/webm",
}

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true })

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "pipe", encoding: "utf8", shell: true })
  if (result.status !== 0) throw new Error(result.stderr?.slice(-300) ?? "ffmpeg failed")
}

// Sort by modification date
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
  const ext  = extname(name).toLowerCase()
  const num  = String(i + 1).padStart(2, "0")
  const src  = join(FOLDER, name)
  const isImage = [".jpg", ".jpeg", ".png"].includes(ext)
  const isSmall = stat.size < SMALL

  // Skip very small files
  if (isSmall) {
    console.log(`[${i + 1}/${files.length}] story-${num}${ext} — IGNORADO (${Math.round(stat.size/1024)}KB)\n`)
    continue
  }

  const outExt  = isImage ? ".webp" : ".mp4"
  const r2Name  = `story-${num}${outExt}`
  const outPath = join(TMP_DIR, r2Name)
  const contentType = isImage ? "image/webp" : "video/mp4"

  process.stdout.write(`[${i + 1}/${files.length}] ${r2Name} `)

  try {
    if (isImage) {
      // JPG/PNG → WebP quality 82
      ffmpeg(["-y", "-i", `"${src}"`, "-quality", "82", `"${outPath}"`])
    } else {
      // MP4 → H.264 CRF-26, max 720px wide, faststart, no audio (stories)
      ffmpeg([
        "-y", "-i", `"${src}"`,
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "fast",
        "-vf", "scale='min(720,iw)':-2",   // max 720px wide, keep ratio divisible by 2
        "-movflags", "+faststart",
        "-an",                              // remove audio
        `"${outPath}"`
      ])
    }

    const origKB = Math.round(stat.size / 1024)
    const outKB  = Math.round(statSync(outPath).size / 1024)
    const pct    = Math.round((1 - outKB / origKB) * 100)

    process.stdout.write(`${origKB}KB → ${outKB}KB (-${pct}%) ... `)

    execSync(
      `npx wrangler r2 object put ${R2_BUCKET}/${r2Name} --file="${outPath}" --content-type="${contentType}"`,
      { stdio: "pipe" }
    )

    const type = isImage ? "image" : "video"
    stories.push({ num: i + 1, type, r2Name })
    console.log("OK")
    ok++
  } catch (err) {
    console.log(`ERRO: ${err.message.slice(0, 150)}`)
    fail++
  }
}

// Cleanup temp
rmSync(TMP_DIR, { recursive: true, force: true })

console.log(`\n✓ ${ok} enviados, ${fail} erros`)
console.log("\n=== Atualize instagram-stories.tsx ===\n")
console.log("const stories = [")
for (const s of stories) {
  console.log(`  { id: ${String(s.num).padStart(2)}, type: "${s.type}", url: \`\${BASE}/${s.r2Name}\` },`)
}
console.log("] as const")
