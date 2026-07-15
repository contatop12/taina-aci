/** Mantenha runtime padrão (Node/OpenNext). `edge` nesta rota pode falhar no Worker da Cloudflare (500). */

import { EMAGRECER_FLOW, VILA_MARIANA_FLOW } from "@/lib/form-flows"

const WEBHOOK_VILA_MARIANA = "https://n8n.sitespdoze.com.br/webhook/vila-mariana-sp"
const WEBHOOK_EMAGRECER =
  "https://n8n.sitespdoze.com.br/webhook/endocrinologista-para-emagrecer/327dfe93-4155-4224-8091-529ff408bfec"

function resolveWebhookUrl(body: unknown): string {
  if (body && typeof body === "object" && "form_id" in body) {
    const formId = (body as { form_id?: unknown }).form_id
    if (formId === EMAGRECER_FLOW.formId) return WEBHOOK_EMAGRECER
    if (formId === VILA_MARIANA_FLOW.formId) return WEBHOOK_VILA_MARIANA
  }
  return WEBHOOK_VILA_MARIANA
}

async function sendWithTimeout(url: string, body: string, timeoutMs = 8000): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  const payload = JSON.stringify(body)
  const webhookUrl = resolveWebhookUrl(body)

  await Promise.allSettled([sendWithTimeout(webhookUrl, payload)])

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
