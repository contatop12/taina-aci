"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, ChevronDown, Check } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"
import { cn } from "@/lib/utils"
import { storeWhatsappRedirectUrl } from "@/lib/whatsapp-redirect-session"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

interface UtmParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
}

const objectives = [
  "Emagrecimento e Tratamento da Obesidade",
  "Saúde Hormonal Feminina e Menopausa",
  "Saúde Hormonal Masculina e reposição de Testosterona",
  "Acompanhamento Pós-Bariátrica",
  "Acompanhamento Metabólico e Hormonal na Gestação",
  "Tratamento de Diabetes (Tipo 1, 2 e Gestacional)",
  "Controle de Distúrbios da Tireoide",
  "Prevenção, Longevidade e Check-up Hormonal",
  "Hipertrofia e Ganho de Massa Magra",
  "Controle de Colesterol e Triglicerídeos",
  "Outro",
]

const FORM_ID = "taina_vila_mariana_sp"
const CODI_ID = "73058194261490732816540927385016"

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [objective, setObjective] = useState("")
  const [otherText, setOtherText] = useState("")
  const [particularAware, setParticularAware] = useState<"" | "sim" | "nao">("")
  const [agreed, setAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hasTrackedFormStartRef = useRef(false)
  const hasTrackedFormSubmitRef = useRef(false)

  const isOther = objective === "Outro"
  const otherObjective = otherText.trim()
  const whatsappObjective = isOther ? (otherObjective || "Outro") : objective
  const isFormValid =
    !!name &&
    !!phone &&
    !!objective &&
    (!isOther || !!otherText.trim()) &&
    !!particularAware &&
    agreed

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    setUtmParams({
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
    })
  }, [isOpen])

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const normalizePhoneForPayload = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const localDigits = digits.startsWith("55") ? digits.slice(2) : digits
    return `+55${localDigits}`
  }

  const pushDataLayerEvent = (eventName: string, extraData: Record<string, unknown> = {}) => {
    if (typeof window === "undefined") return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: eventName,
      form_id: FORM_ID,
      codi_id: CODI_ID,
      ...extraData,
    })
  }

  const handleFormStart = () => {
    if (hasTrackedFormStartRef.current) return
    hasTrackedFormStartRef.current = true
    pushDataLayerEvent("form_start", {
      origem: "formulario-modal",
      pagina: window.location.href,
    })
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleObjectiveToggle = () => {
    const activeElement = document.activeElement
    if (activeElement instanceof HTMLElement) {
      activeElement.blur()
    }

    setIsDropdownOpen((prev) => {
      const next = !prev
      if (next) {
        requestAnimationFrame(() => {
          dropdownRef.current?.scrollIntoView({ block: "center", behavior: "smooth" })
        })
      }
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    if (particularAware === "nao") {
      router.push("/desq")
      onClose()
      resetForm()
      return
    }

    if (!hasTrackedFormSubmitRef.current) {
      hasTrackedFormSubmitRef.current = true
      pushDataLayerEvent("form_submit", {
        origem: "formulario-modal",
        pagina: window.location.href,
        ...utmParams,
      })
    }
    setIsSubmitting(true)

    const whatsappNumber = "5511951515103"
    const message = encodeURIComponent(
      `Olá! Meu nome é ${name} e gostaria de agendar uma consulta. Tenho interesse em: ${whatsappObjective}. Confirmo ciência de que o atendimento é particular.`
    )
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`

    // Envia lead via rota de API interna (evita CORS do browser → n8n)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_id: FORM_ID,
          codi_id: CODI_ID,
          nome: name,
          telefone: normalizePhoneForPayload(phone),
          objetivo: objective,
          objetivo_outro: isOther ? otherObjective : "",
          ciente_consulta_particular: true,
          origem: "formulario-modal",
          pagina: typeof window !== "undefined" ? window.location.href : "",
          data: new Date().toISOString(),
          ...utmParams,
        }),
      })
    } catch (_) {
      // Falha silenciosa — não impede o fluxo do usuário
    }

    setIsSubmitting(false)

    storeWhatsappRedirectUrl(whatsappUrl)

    const query = typeof window !== "undefined" ? window.location.search : ""
    onClose()
    resetForm()
    router.push(`/obrigado${query}`)
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setObjective("")
    setOtherText("")
    setParticularAware("")
    setAgreed(true)
    setIsDropdownOpen(false)
    hasTrackedFormStartRef.current = false
    hasTrackedFormSubmitRef.current = false
  }

  const handleClose = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92dvh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">

        {/* Decorative top bar */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#AABB6A] to-transparent sticky top-0" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-5 pt-8 pb-8 sm:px-8">
          {/* Header */}
          <div className="text-center mb-7">
            <Image
              src="/LOGO%20V2%20TAIN%C3%83.png"
              alt="Dra. Tainã Aci"
              width={160}
              height={50}
              className="h-12 w-auto mx-auto mb-5"
            />
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                Consulta Particular
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <h3 className="text-xl font-serif text-foreground leading-snug">
              Fale agora com um atendente
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Nossa equipe entrará em contato pelo WhatsApp em instantes.
            </p>
          </div>

          <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} className="space-y-4">
              <input type="hidden" name="utm_source" value={utmParams.utm_source} />
              <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
              <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
              <input type="hidden" name="utm_term" value={utmParams.utm_term} />
              <input type="hidden" name="utm_content" value={utmParams.utm_content} />

              {/* Name input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="peer w-full px-4 pt-5 pb-2 text-base md:text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary">
                  Nome completo
                </label>
              </div>

              {/* Phone input */}
              <div className="relative">
                <input
                  type="tel"
                  placeholder=" "
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  className="peer w-full px-4 pt-5 pb-2 text-base md:text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary">
                  WhatsApp
                </label>
              </div>

              {/* Objective dropdown */}
              <div ref={dropdownRef} className="relative">
                {/* Trigger */}
                <button
                  type="button"
                  onClick={handleObjectiveToggle}
                  className={cn(
                    "w-full px-4 py-3.5 text-base md:text-sm border rounded-xl bg-muted/30 text-left flex items-center justify-between gap-3 transition-all duration-200 focus:outline-none",
                    isDropdownOpen
                      ? "border-primary bg-white"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className={objective ? "text-foreground" : "text-muted-foreground"}>
                    {objective || "Selecione o acompanhamento"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
                      isDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown list */}
                {isDropdownOpen && (
                  <div className="absolute z-30 mt-1.5 w-full bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                    <div className="max-h-56 overflow-y-auto divide-y divide-border/50">
                      {objectives.map((obj) => (
                        <button
                          key={obj}
                          type="button"
                          onClick={() => {
                            setObjective(obj)
                            setIsDropdownOpen(false)
                            if (obj !== "Outro") setOtherText("")
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm transition-colors",
                            objective === obj
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted/60"
                          )}
                        >
                          {obj}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Campo livre quando "Outro" selecionado */}
                {isOther && (
                  <div className="relative mt-2">
                    <input
                      type="text"
                      placeholder=" "
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      autoFocus
                      className="peer w-full px-4 pt-5 pb-2 text-base md:text-sm border border-primary rounded-xl bg-primary/5 text-foreground placeholder-transparent focus:outline-none focus:bg-white transition-all duration-200"
                    />
                    <label className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary">
                      Descreva seu objetivo
                    </label>
                  </div>
                )}
              </div>

              {/* Consulta particular — Sim/Não */}
              <div className="space-y-2">
                <p className="text-[10px] text-primary font-medium leading-relaxed">
                  Você está ciente de que essa consulta é somente particular?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setParticularAware("sim")}
                    className={cn(
                      "flex-1 py-3 px-3 rounded-xl text-sm font-medium border transition-all duration-200",
                      particularAware === "sim"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticularAware("nao")}
                    className={cn(
                      "flex-1 py-3 px-3 rounded-xl text-sm font-medium border transition-all duration-200",
                      particularAware === "nao"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    Não
                  </button>
                </div>
              </div>

              {/* Privacy checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={cn(
                    "w-4 h-4 rounded border transition-all duration-200",
                    agreed
                      ? "bg-primary border-primary"
                      : "border-border bg-white group-hover:border-primary/50"
                  )}>
                    {agreed && <Check className="w-3 h-3 text-white m-auto mt-0.5" strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Autorizo o uso dos meus dados para contato, conforme a política de privacidade.
                </span>
              </label>

              {/* Submit */}
              <div className="pt-1">
                <CTAButton
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Enviando..." : "Falar com a equipe agora"}
                </CTAButton>
              </div>

          </form>
        </div>
      </div>
    </div>
  )
}
