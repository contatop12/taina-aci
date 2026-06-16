/**
 * Converte imagens PNG/JPG de public/ para WebP e faz upload ao R2.
 * Usage: node scripts/convert-public-to-webp.mjs [--upload]
 */

import { spawnSync } from "child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync } from "fs"
import { join, extname, basename } from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const PUBLIC = join(ROOT, "public")
const R2_BUCKET = "taina-aci"
const R2_BASE = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"

/** Nome legível no R2 (sem acentos/espaços). */
const R2_KEYS = {
  "Medicina Baseada em Evidência.png": "diferencial-medicina-evidencia.webp",
  "Medicina Baseada em Evidência- V2.png": "diferencial-medicina-evidencia.webp",
  "Consulta Médica + Nutricional Integrada.png": "diferencial-consulta-integrada.webp",
  "Consulta Médica + Nutricional Integrada- V2.png": "diferencial-consulta-integrada.webp",
  "Exames Avançados_ Teste Genético, Scanner Corporal e Bioimpedância.png":
    "diferencial-exames-avancados.webp",
  "Exames Avançados_ Teste Genético, Scanner Corporal e Bioimpedância- V2.png":
    "diferencial-exames-avancados.webp",
  "Quando indicado_ tratamento medicamentoso acompanhado.png":
    "diferencial-tratamento-medicamentoso.webp",
  "Quando indicado_ tratamento medicamentoso acompanhado- V2.png":
    "diferencial-tratamento-medicamentoso.webp",
  "LOGO V2 TAINÃ.png": "logo-principal.webp",
  "LOGO V2 TAINÃ BRANCO.png": "logo-rodape-branco.webp",
  "FAV ICON TAINA V2.png": "favicon.webp",
}

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg"])

function ffmpeg(args) {
  const r = spawnSync("ffmpeg", args, { encoding: "utf8" })
  if (r.status !== 0) throw new Error(r.stderr?.slice(-400) ?? "ffmpeg failed")
}

function convertToWebp(src, dest, maxWidth = 1920) {
  ffmpeg([
    "-y",
    "-i",
    src,
    "-vf",
    `scale='min(${maxWidth},iw)':-2`,
    "-quality",
    "82",
    dest,
  ])
}

const uploads = []

for (const file of readdirSync(PUBLIC)) {
  const ext = extname(file).toLowerCase()
  if (!IMAGE_EXT.has(ext)) continue

  const src = join(PUBLIC, file)
  const r2Key = R2_KEYS[file] ?? `${basename(file, ext)}.webp`.toLowerCase().replace(/\s+/g, "-")
  const dest = join(PUBLIC, r2Key)

  const before = statSync(src).size
  process.stdout.write(`Convertendo ${file} → ${r2Key} ... `)
  convertToWebp(src, dest, file.includes("FAV") ? 512 : 1920)
  const after = statSync(dest).size
  console.log(`${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`)

  uploads.push({ local: dest, r2Key, url: `${R2_BASE}/${r2Key}` })

  if (src !== dest && file !== basename(dest)) {
    try {
      unlinkSync(src)
      console.log(`  Removido: ${file}`)
    } catch {
      /* png mantido se falhar */
    }
  }
}

console.log("\nURLs R2:")
for (const u of uploads) console.log(`  ${u.r2Key} → ${u.url}`)

if (process.argv.includes("--upload")) {
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!token) {
    console.error("\nDefina CLOUDFLARE_API_TOKEN para upload.")
    process.exit(1)
  }

  console.log("\nUpload R2...")
  for (const { local, r2Key } of uploads) {
    const r = spawnSync(
      "npx",
      [
        "wrangler",
        "r2",
        "object",
        "put",
        `${R2_BUCKET}/${r2Key}`,
        `--file=${local}`,
        "--content-type=image/webp",
        "--remote",
      ],
      {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env, CLOUDFLARE_API_TOKEN: token },
        shell: true,
      }
    )
    if (r.status !== 0) {
      console.error(`Falha ${r2Key}:`, r.stderr?.slice(-200))
      process.exit(1)
    }
    console.log(`  ✓ ${r2Key}`)
  }
}
