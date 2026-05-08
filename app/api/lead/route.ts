export const runtime = "edge"

const WEBHOOK_URLS = [
  "https://n8n-webhook.axmxa0.easypanel.host/webhook/vila-mariana-sp",
  "https://python-auto-relatorio-trafego.axmxa0.easypanel.host/site-new-lead",
]

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
  try {
    const body = await request.json()
    const payload = JSON.stringify(body)

    await Promise.allSettled(
      WEBHOOK_URLS.map((url) => sendWithTimeout(url, payload))
    )

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}
