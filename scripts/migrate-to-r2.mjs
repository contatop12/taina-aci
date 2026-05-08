/**
 * Migrates media files from Supabase Storage to Cloudflare R2.
 * Requires: wrangler authenticated (`npx wrangler login`)
 * Usage: node scripts/migrate-to-r2.mjs
 */

import { execSync } from "child_process"
import { writeFileSync, unlinkSync, mkdirSync, existsSync } from "fs"
import { join } from "path"
import { tmpdir } from "os"

const SUPABASE_BASE = "https://odisewmgwxgjhqhsznuv.supabase.co/storage/v1/object/public/taina-stories"
const R2_BUCKET = "taina-aci"

const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".mp4":  "video/mp4",
  ".mov":  "video/quicktime",
  ".webm": "video/webm",
}

// All files referenced in the app + logos
const FILES = [
  "story-01.jpg",
  "story-02.mp4",
  "story-03.mp4",
  "story-04.mp4",
  "story-05.mp4",
  "story-06.mp4",
  "story-07.mp4",
  "story-08.mp4",
  "story-09.mp4",
  "story-10.mp4",
  "story-11.mp4",
  "story-12.mp4",
  "story-13.mp4",
  "story-14.mp4",
  "story-15.mp4",
  "story-16.mp4",
  "story-18.mp4",
  "story-19.mp4",
  "story-20.mp4",
  "story-21.mp4",
  "story-22.mp4",
  "story-23.mp4",
  "story-24.mp4",
  "story-26.mp4",
  "story-27.mp4",
  "story-29.mp4",
  "logo-principal.png",
  "logo-rodape.png",
]

const TMP_DIR = join(tmpdir(), "taina-r2-migration")
if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true })

let ok = 0, skip = 0, fail = 0

for (let i = 0; i < FILES.length; i++) {
  const file = FILES[i]
  const ext = "." + file.split(".").pop().toLowerCase()
  const contentType = MIME[ext] ?? "application/octet-stream"
  const url = `${SUPABASE_BASE}/${file}`
  const tmpPath = join(TMP_DIR, file)

  process.stdout.write(`[${i + 1}/${FILES.length}] ${file} ... `)

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.log(`SKIP (HTTP ${res.status})`)
      skip++
      continue
    }

    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(tmpPath, buf)

    execSync(
      `npx wrangler r2 object put ${R2_BUCKET}/${file} --file="${tmpPath}" --content-type="${contentType}"`,
      { stdio: "pipe" }
    )

    unlinkSync(tmpPath)
    console.log("OK")
    ok++
  } catch (err) {
    console.log(`ERRO: ${err.message}`)
    fail++
  }
}

console.log(`\nMigração concluída: ${ok} OK, ${skip} ignorados, ${fail} erros`)
console.log("\nPróximo passo: habilite o acesso público do bucket no painel Cloudflare.")
console.log("R2 → taina-aci → Settings → Public Access → Enable")
console.log("Copie a URL pub-XXXX.r2.dev e atualize R2_BASE em components/instagram-stories.tsx")
