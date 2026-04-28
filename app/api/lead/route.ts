export const runtime = "nodejs"

const WEBHOOK_URLS = [
  "https://n8n-webhook.axmxa0.easypanel.host/webhook/vila-mariana-sp",
  "https://python-auto-relatorio-trafego.axmxa0.easypanel.host/meta-new-lead",
]

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      )
    )

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch {
    // Não expõe erros internos ao cliente
    return new Response(JSON.stringify({ ok: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}
