/**
 * Converte imagens V2 dos Diferenciais para WebP e envia ao R2.
 * Usage: node scripts/upload-diferenciais-v2.mjs
 */

import { spawnSync } from "child_process"
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync, rmSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { tmpdir } from "os"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const PUBLIC = join(ROOT, "public")
const TMP_DIR = join(tmpdir(), "taina-diferenciais-v2")

const DOWNLOADS = "C:\\Users\\rya_p\\Downloads"
const R2_BUCKET = "taina-aci"

const FILES = [
  {
    src: "Medicina Baseada em Evidência- V2.png",
    r2Key: "diferencial-medicina-evidencia.webp",
  },
  {
    src: "Consulta Médica + Nutricional Integrada- V2.png",
    r2Key: "diferencial-consulta-integrada.webp",
  },
  {
    src: "Exames Avançados_ Teste Genético, Scanner Corporal e Bioimpedância- V2.png",
    r2Key: "diferencial-exames-avancados.webp",
  },
  {
    src: "Quando indicado_ tratamento medicamentoso acompanhado- V2.png",
    r2Key: "diferencial-tratamento-medicamentoso.webp",
  },
]

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "pipe", encoding: "utf8" })
  if (result.status !== 0) {
    throw new Error(result.stderr?.slice(-400) ?? "ffmpeg failed")
  }
}

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true })

let ok = 0
let fail = 0

for (const { src, r2Key } of FILES) {
  const srcPath = join(DOWNLOADS, src)
  const tmpPath = join(TMP_DIR, r2Key)
  const publicPath = join(PUBLIC, r2Key)

  if (!existsSync(srcPath)) {
    console.log(`✗ Arquivo não encontrado: ${srcPath}`)
    fail++
    continue
  }

  process.stdout.write(`${src} → ${r2Key} ... `)

  try {
    ffmpeg([
      "-y",
      "-i",
      srcPath,
      "-vf",
      "scale='min(1920,iw)':-2",
      "-quality",
      "82",
      tmpPath,
    ])

    const origKB = Math.round(statSync(srcPath).size / 1024)
    const outKB = Math.round(statSync(tmpPath).size / 1024)
    const body = readFileSync(tmpPath)

    writeFileSync(publicPath, body)

    const upload = spawnSync(
      "npx",
      [
        "wrangler",
        "r2",
        "object",
        "put",
        `${R2_BUCKET}/${r2Key}`,
        `--file="${publicPath}"`,
        "--content-type=image/webp",
        "--remote",
      ],
      { cwd: ROOT, encoding: "utf8", shell: true }
    )

    if (upload.status !== 0) {
      throw new Error(upload.stderr?.slice(-300) ?? "wrangler upload failed")
    }

    console.log(`${origKB}KB → ${outKB}KB ✓`)
    ok++
  } catch (err) {
    console.log(`ERRO: ${err.message.slice(0, 200)}`)
    fail++
  }
}

rmSync(TMP_DIR, { recursive: true, force: true })

console.log(`\n✓ ${ok} enviados, ${fail} erros`)
