import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { spawnSync } from "child_process"
import { readFileSync, statSync, mkdirSync, existsSync, rmSync } from "fs"
import { join } from "path"
import { tmpdir } from "os"

function loadEnvFile() {
  const envPath = join(process.cwd(), ".env")
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue
    const [key, ...rest] = trimmed.split("=")
    if (!process.env[key]) process.env[key] = rest.join("=").trim()
  }
}

loadEnvFile()

const VIDEO_PATH = process.argv[2] ?? "C:\\Users\\rya_p\\Downloads\\VIDEO HOME TAINA ACI V3.mp4"
const R2_KEY = "hero-home-v3.mp4"
const R2_BUCKET = "taina-aci"
const R2_BASE = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"
const TMP_DIR = join(tmpdir(), "taina-hero-video")
const OUT_PATH = join(TMP_DIR, R2_KEY)

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://0976ee0adac0062c726747d29549308e.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: process.env.ID_da_chave_de_acesso ?? "c7a00af948e48e3820475a89ab0ef3c7",
    secretAccessKey:
      process.env.Chave_de_acesso_secreta ??
      "c973e847a4db1f7b54192c74b1105a1220fb347e2a560482640d08fae69775b6",
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
})

if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true })

if (!existsSync(OUT_PATH)) {
  const origMB = Math.round(statSync(VIDEO_PATH).size / 1024 / 1024)
  console.log(`Otimizando vídeo (${origMB}MB)...`)

  const ffmpeg = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      VIDEO_PATH,
      "-c:v",
      "libx264",
      "-crf",
      "24",
      "-preset",
      "medium",
      "-vf",
      "scale=trunc(min(1920\\,iw)/2)*2:-2",
      "-movflags",
      "+faststart",
      "-an",
      OUT_PATH,
    ],
    { stdio: "inherit" }
  )

  if (ffmpeg.status !== 0) {
    console.error("ffmpeg falhou")
    process.exit(1)
  }
} else {
  console.log("Usando vídeo otimizado em cache.")
}

const outMB = Math.round(statSync(OUT_PATH).size / 1024 / 1024)
console.log(`Enviando ${R2_KEY} (${outMB}MB)...`)

const body = readFileSync(OUT_PATH)
await s3.send(
  new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: R2_KEY,
    Body: body,
    ContentType: "video/mp4",
  })
)

console.log(`OK: ${R2_BASE}/${R2_KEY}`)
console.log(`Use em lib/media.ts: mediaUrl("${R2_KEY}")`)
