/** URL do WhatsApp criada ao enviar o formulário — lida na página /obrigado antes do redirect. */

export const CONTACT_FORM_WHATSAPP_STORAGE_KEY = "taina_contact_form_whatsapp_redirect_v1"

export function storeWhatsappRedirectUrl(url: string): void {
  try {
    if (!url.startsWith("https://api.whatsapp.com/")) return
    sessionStorage.setItem(CONTACT_FORM_WHATSAPP_STORAGE_KEY, url)
  } catch {
    /* private mode / bloqueio */
  }
}

export function getWhatsappRedirectUrl(): string | null {
  try {
    const raw = sessionStorage.getItem(CONTACT_FORM_WHATSAPP_STORAGE_KEY)
    return raw?.startsWith("https://api.whatsapp.com/") ? raw : null
  } catch {
    return null
  }
}

export function clearWhatsappRedirectUrl(): void {
  try {
    sessionStorage.removeItem(CONTACT_FORM_WHATSAPP_STORAGE_KEY)
  } catch {
    /* noop */
  }
}
