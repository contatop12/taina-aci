export const SITE_BASE_URL = "https://endocrinologista.tainaaci.com.br"
export const WHATSAPP_NUMBER = "5511951515103"
export const CODI_ID = "73058194261490732816540927385016"

export interface TrackingParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  utm_id: string
  gclid: string
  gbraid: string
  gad_source: string
  gad_campaignid: string
  fbclid: string
  device: string
}

export const EMPTY_TRACKING_PARAMS: TrackingParams = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  utm_id: "",
  gclid: "",
  gbraid: "",
  gad_source: "",
  gad_campaignid: "",
  fbclid: "",
  device: "",
}

const TRACKING_KEYS = Object.keys(EMPTY_TRACKING_PARAMS) as (keyof TrackingParams)[]

export function readTrackingParamsFromSearch(search: string): TrackingParams {
  const params = new URLSearchParams(search)
  const tracking = { ...EMPTY_TRACKING_PARAMS }

  for (const key of TRACKING_KEYS) {
    tracking[key] = params.get(key) ?? ""
  }

  return tracking
}

export function readTrackingParamsFromWindow(): TrackingParams {
  if (typeof window === "undefined") return { ...EMPTY_TRACKING_PARAMS }
  return readTrackingParamsFromSearch(window.location.search)
}

function buildUtmUrl(path: string, utm: Partial<Pick<TrackingParams, "utm_source" | "utm_medium" | "utm_campaign" | "utm_content">>): string {
  const url = new URL(path, SITE_BASE_URL)
  if (utm.utm_source) url.searchParams.set("utm_source", utm.utm_source)
  if (utm.utm_medium) url.searchParams.set("utm_medium", utm.utm_medium)
  if (utm.utm_campaign) url.searchParams.set("utm_campaign", utm.utm_campaign)
  if (utm.utm_content) url.searchParams.set("utm_content", utm.utm_content)
  return url.toString()
}

/** Links prontos para bio do Instagram e Google Meu Negócio */
export const MARKETING_LINKS = {
  whatsapp: {
    instagramBio: buildUtmUrl("/vila-mariana/whatsapp", {
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "bio",
    }),
    googleMeuNegocio: buildUtmUrl("/vila-mariana/whatsapp", {
      utm_source: "google",
      utm_medium: "organic",
      utm_campaign: "meu_negocio",
    }),
  },
  form: {
    vilaMarianaInstagramBio: buildUtmUrl("/vila-mariana-sp", {
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "bio",
    }),
    vilaMarianaGoogleMeuNegocio: buildUtmUrl("/vila-mariana-sp", {
      utm_source: "google",
      utm_medium: "organic",
      utm_campaign: "meu_negocio",
    }),
    emagrecerInstagramBio: buildUtmUrl("/endocrinologista-para-emagrecer", {
      utm_source: "instagram",
      utm_medium: "social",
      utm_campaign: "bio",
    }),
    emagrecerGoogleMeuNegocio: buildUtmUrl("/endocrinologista-para-emagrecer", {
      utm_source: "google",
      utm_medium: "organic",
      utm_campaign: "meu_negocio",
    }),
  },
} as const

function formatTrackingSource(tracking: TrackingParams): string | null {
  if (tracking.utm_source) {
    const parts = [tracking.utm_source]
    if (tracking.utm_medium) parts.push(tracking.utm_medium)
    if (tracking.utm_campaign) parts.push(tracking.utm_campaign)
    return parts.join(" / ")
  }
  if (tracking.gclid) return "Google Ads"
  if (tracking.fbclid) return "Facebook / Instagram Ads"
  return null
}

export function buildWhatsAppUrl(options?: {
  message?: string
  tracking?: TrackingParams
}): string {
  const message = buildWhatsAppMessage(options)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function buildWhatsAppApiUrl(options?: {
  message?: string
  tracking?: TrackingParams
}): string {
  const message = buildWhatsAppMessage(options)
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
}

function buildWhatsAppMessage(options?: {
  message?: string
  tracking?: TrackingParams
}): string {
  const tracking = options?.tracking ?? EMPTY_TRACKING_PARAMS
  const source = formatTrackingSource(tracking)
  const defaultMessage =
    "Olá! Gostaria de agendar uma consulta com a Dra. Tainã Aci na Vila Mariana."
  let message = options?.message ?? defaultMessage

  if (source) {
    message += ` (Origem: ${source})`
  }

  return message
}

export function pushDataLayerEvent(
  eventName: string,
  formId: string,
  extraData: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    form_id: formId,
    codi_id: CODI_ID,
    ...extraData,
  })
}

export async function sendLeadClickToWebhook(payload: Record<string, unknown>): Promise<void> {
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch {
    // Falha silenciosa — não impede o fluxo do usuário
  }
}
