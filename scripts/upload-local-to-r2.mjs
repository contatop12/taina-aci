/**
 * Uploads local media files to Cloudflare R2, renaming them sequentially.
 * Usage: node scripts/upload-local-to-r2.mjs
 * Requires wrangler authenticated.
 */

import { execSync } from "child_process"
import { readdirSync, statSync } from "fs"
import { join, extname, basename } from "path"

const FOLDER = "C:\\Users\\rya_p\\Downloads\\DESTAQUE -TAINÃ ACI"
const R2_BUCKET = "taina-aci"
const R2_BASE = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"

const MIME = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".mp4":  "video/mp4",
  ".mov":  "video/quicktime",
  ".webm": "video/webm",
}

// Read + sort by modification date
const files = readdirSync(FOLDER)
  .map((name) => ({ name, stat: statSync(join(FOLDER, name)) }))
  .filter(({ stat, name }) => stat.isFile() && MIME[extname(name).toLowerCase()])
  .sort((a, b) => a.stat.mtimeMs - b.stat.mtimeMs)

console.log(`${files.length} arquivos encontrados.\n`)

// Flag very small files (likely useless clips)
const SMALL_THRESHOLD = 100_000 // 100KB

const stories = []
let ok = 0, fail = 0

for (let i = 0; i < files.length; i++) {
  const { name, stat } = files[i]
  const ext = extname(name).toLowerCase()
  const contentType = MIME[ext]
  const num = String(i + 1).padStart(2, "0")
  const r2Name = `story-${num}${ext}`
  const srcPath = join(FOLDER, name)
  const sizeKB = Math.round(stat.size / 1024)
  const flag = stat.size < SMALL_THRESHOLD ? " ⚠ PEQUENO" : ""

  process.stdout.write(`[${i + 1}/${files.length}] ${r2Name} (${sizeKB}KB)${flag} ... `)

  try {
    execSync(
      `npx wrangler r2 object put ${R2_BUCKET}/${r2Name} --file="${srcPath}" --content-type="${contentType}"`,
      { stdio: "pipe" }
    )
    const type = ext === ".jpg" || ext === ".jpeg" || ext === ".png" ? "image" : "video"
    stories.push({ id: i + 1, type, url: `${R2_BASE}/${r2Name}`, sizeKB, flag: !!flag })
    console.log("OK")
    ok++
  } catch (err) {
    console.log(`ERRO: ${err.message.slice(0, 120)}`)
    fail++
  }
}

console.log(`\n✓ ${ok} enviados, ${fail} erros`)

// Print generated stories array for instagram-stories.tsx
console.log("\n=== Cole em instagram-stories.tsx ===\n")
console.log("const stories = [")
for (const s of stories) {
  const flag = s.flag ? ` // ⚠ ${s.sizeKB}KB — verificar` : ""
  console.log(`  { id: ${String(s.id).padStart(2)}, type: "${s.type}", url: \`\${BASE}/${basename(s.url)}\` },${flag}`)
}
console.log("] as const")
