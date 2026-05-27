"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import {
  clearWhatsappRedirectUrl,
  getWhatsappRedirectUrl,
} from "@/lib/whatsapp-redirect-session"
import { CTAButton } from "@/components/ui/cta-button"

const FORM_ID = "taina_vila_mariana_sp"

export function ObrigadoContent() {
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const redirectedRef = useRef(false)

  useEffect(() => {
    setWhatsappUrl(getWhatsappRedirectUrl())

    if (typeof window === "undefined") return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "lead_obrigado",
      page_path: "/obrigado",
      form_id: FORM_ID,
    })
  }, [])

  useEffect(() => {
    if (!whatsappUrl || typeof window === "undefined") return

    const timer = window.setTimeout(() => {
      if (!redirectedRef.current) {
        redirectedRef.current = true
        clearWhatsappRedirectUrl()
        window.location.assign(whatsappUrl)
      }
    }, 10000)

    return () => window.clearTimeout(timer)
  }, [whatsappUrl])

  const openWhatsapp = () => {
    if (!whatsappUrl) return
    redirectedRef.current = true
    clearWhatsappRedirectUrl()
    window.location.assign(whatsappUrl)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 h-[70px] md:h-[80px] flex items-center justify-center md:justify-start">
          <Link href="/" className="inline-block">
            <Image
              src="/LOGO%20V2%20TAIN%C3%83.png"
              alt="Dra. Tainã Aci"
              width={220}
              height={56}
              className="h-11 md:h-14 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-14 text-center">
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
          <div className="relative w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="w-11 h-11 text-primary" strokeWidth={2} />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
          Envio confirmado
        </p>
        <h1 className="text-2xl md:text-3xl font-serif text-foreground max-w-lg leading-snug mb-4">
          Recebemos seu contato!
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
          {whatsappUrl ? (
            <>
              Em instantes você será direcionado ao WhatsApp para continuar com nossa equipe.
              Se isso não acontecer automaticamente, use o botão abaixo.
            </>
          ) : (
            <>
              Nossa equipe entrará em contato com você dentro dos próximos minutos.
            </>
          )}
        </p>

        {whatsappUrl && (
          <CTAButton onClick={openWhatsapp} size="lg">
            Abrir WhatsApp agora
          </CTAButton>
        )}
      </div>
    </main>
  )
}
