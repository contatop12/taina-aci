import { createClient } from "@supabase/supabase-js"
import { readFileSync, readdirSync } from "fs"
import { join, extname, basename } from "path"

const SUPABASE_URL = "https://odisewmgwxgjhqhsznuv.supabase.co"
const SUPABASE_KEY = process.env.SUPABASE_KEY
const BUCKET = "taina-stories"
const FOLDER = process.env.MEDIA_FOLDER

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
}

async function main() {
  // Ensure bucket exists with public access
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.some((b) => b.id === BUCKET)

  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true })
    if (error) { console.error("Bucket error:", error.message); process.exit(1) }
    console.log(`Bucket '${BUCKET}' criado.`)
  } else {
    console.log(`Bucket '${BUCKET}' já existe.`)
  }

  const files = readdirSync(FOLDER).filter((f) => MIME[extname(f).toLowerCase()])
  console.log(`Enviando ${files.length} arquivo(s)...`)

  const urls = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const ext = extname(file).toLowerCase()
    const type = ext === ".jpg" || ext === ".jpeg" || ext === ".png" ? "image" : "video"
    const storageName = `story-${String(i + 1).padStart(2, "0")}${ext}`
    const filePath = join(FOLDER, file)
    const content = readFileSync(filePath)

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storageName, content, {
        contentType: MIME[ext],
        upsert: true,
      })

    if (error) {
      console.error(`Erro ao enviar ${file}: ${error.message}`)
      continue
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storageName)
    urls.push({ type, url: data.publicUrl, name: storageName })
    console.log(`[${i + 1}/${files.length}] ${storageName} ✓`)
  }

  console.log("\n=== URLs geradas ===")
  console.log(JSON.stringify(urls, null, 2))
}

main().catch(console.error)
