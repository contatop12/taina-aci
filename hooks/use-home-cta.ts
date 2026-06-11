"use client"

import { useCallback, useState } from "react"
import {
  buildWhatsAppUrl,
  pushDataLayerEvent,
  readTrackingParamsFromWindow,
  sendLeadClickToWebhook,
} from "@/lib/tracking"

const WHATSAPP_FORM_ID = "taina_vila_mariana_whatsapp"

export type HomeContentVariant = "form" | "whatsapp"

export function useHomeCta(variant: HomeContentVariant = "form") {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWhatsApp = useCallback(() => {
    const tracking = readTrackingParamsFromWindow()
    const pagina = typeof window !== "undefined" ? window.location.href : ""

    pushDataLayerEvent("whatsapp_click", WHATSAPP_FORM_ID, {
      origem: "botao_whatsapp",
      pagina,
      ...tracking,
    })

    void sendLeadClickToWebhook({
      form_id: WHATSAPP_FORM_ID,
      tipo: "clique_whatsapp",
      origem: "botao_whatsapp",
      pagina,
      data: new Date().toISOString(),
      ...tracking,
    })

    window.open(buildWhatsAppUrl({ tracking }), "_blank", "noopener,noreferrer")
  }, [])

  const onCtaClick = variant === "whatsapp" ? openWhatsApp : () => setIsModalOpen(true)

  return {
    isModalOpen,
    setIsModalOpen,
    onCtaClick,
    showModal: variant === "form",
  }
}
