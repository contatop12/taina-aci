import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { readFileSync } from "fs"
import { join } from "path"
import { tmpdir } from "os"

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://0976ee0adac0062c726747d29549308e.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "c7a00af948e48e3820475a89ab0ef3c7",
    secretAccessKey: "c973e847a4db1f7b54192c74b1105a1220fb347e2a560482640d08fae69775b6",
  },
})

const TMP = join(tmpdir(), "taina-imgs")

for (const name of ["foto-taina1", "foto-taina2"]) {
  const path = join(TMP, `${name}.webp`)
  const body = readFileSync(path)
  await s3.send(new PutObjectCommand({
    Bucket: "taina-aci",
    Key: `${name}.webp`,
    Body: body,
    ContentType: "image/webp",
  }))
  console.log(`${name}.webp OK`)
}
