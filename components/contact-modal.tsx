"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { X, ChevronDown, Check } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"
import { cn } from "@/lib/utils"
import { storeWhatsappRedirectUrl } from "@/lib/whatsapp-redirect-session"
import { getFormFlow } from "@/lib/form-flows"
import {
  CODI_ID,
  EMPTY_TRACKING_PARAMS,
  type TrackingParams,
  buildWhatsAppApiUrl,
  pushDataLayerEvent,
  readTrackingParamsFromSearch,
  sendLeadClickToWebhook,
} from "@/lib/tracking"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  objectives?: string[]
  subtitle?: string
  submitLabel?: string
  formId?: string
}

const DDI_OPTIONS = [
  { code: "+55", flag: "🇧🇷", label: "Brasil" },
  { code: "+1", flag: "🇺🇸", label: "EUA / Canadá" },
  { code: "+351", flag: "🇵🇹", label: "Portugal" },
  { code: "+54", flag: "🇦🇷", label: "Argentina" },
  { code: "+34", flag: "🇪🇸", label: "Espanha" },
  { code: "+44", flag: "🇬🇧", label: "Reino Unido" },
  { code: "+33", flag: "🇫🇷", label: "França" },
  { code: "+49", flag: "🇩🇪", label: "Alemanha" },
  { code: "+39", flag: "🇮🇹", label: "Itália" },
  { code: "+41", flag: "🇨🇭", label: "Suíça" },
  { code: "+244", flag: "🇦🇴", label: "Angola" },
  { code: "+258", flag: "🇲🇿", label: "Moçambique" },
]

const DEFAULT_OBJECTIVES = [
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

const DEFAULT_FORM_ID = "taina_vila_mariana_sp"

export function ContactModal({
  isOpen,
  onClose,
  objectives = DEFAULT_OBJECTIVES,
  subtitle = "Nossa equipe entrará em contato pelo WhatsApp em instantes.",
  submitLabel = "Falar com a equipe agora",
  formId = DEFAULT_FORM_ID,
}: ContactModalProps) {
  const router = useRouter()
  const FORM_ID = formId
  const flow = getFormFlow(FORM_ID)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [objective, setObjective] = useState("")
  const [otherText, setOtherText] = useState("")
  const [situacao, setSituacao] = useState<"" | "pronto" | "plano">("")
  const [agreed, setAgreed] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [ddi, setDdi] = useState("+55")
  const [ddiOpen, setDdiOpen] = useState(false)
  const [trackingParams, setTrackingParams] = useState<TrackingParams>(EMPTY_TRACKING_PARAMS)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const ddiRef = useRef<HTMLDivElement>(null)
  const hasTrackedFormStartRef = useRef(false)
  const hasTrackedFormSubmitRef = useRef(false)

  const isOther = objective === "Outro"
  const otherObjective = otherText.trim()
  const whatsappObjective = isOther ? (otherObjective || "Outro") : objective
  const phoneDigits = phone.replace(/\D/g, "")
  const phoneHasCountryCode = ddi === "+55" && phoneDigits.startsWith("55") && phoneDigits.length > 2
  const isPhoneValid = ddi === "+55"
    ? phoneDigits.length >= 10 && phoneDigits.length <= 11
    : phoneDigits.length >= 5
  const isFormValid =
    !!name &&
    isPhoneValid &&
    !!objective &&
    (!isOther || !!otherText.trim()) &&
    !!situacao &&
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
    const handler = (e: MouseEvent) => {
      if (ddiRef.current && !ddiRef.current.contains(e.target as Node)) {
        setDdiOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    setTrackingParams(readTrackingParamsFromSearch(window.location.search))
  }, [isOpen])

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  const normalizePhoneForPayload = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return `${ddi}${digits}`
  }

  const pushFormDataLayerEvent = (eventName: string, extraData: Record<string, unknown> = {}) => {
    pushDataLayerEvent(eventName, FORM_ID, {
      origem: "formulario-modal",
      pagina: typeof window !== "undefined" ? window.location.href : "",
      ...extraData,
    })
  }

  const handleFormStart = () => {
    if (hasTrackedFormStartRef.current) return
    hasTrackedFormStartRef.current = true
    pushFormDataLayerEvent("form_start")
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (ddi === "+55") {
      setPhone(formatPhone(e.target.value))
    } else {
      setPhone(e.target.value.replace(/\D/g, ""))
    }
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

    if (!hasTrackedFormSubmitRef.current) {
      hasTrackedFormSubmitRef.current = true
      pushFormDataLayerEvent("form_submit", {
        nome: name,
        email,
        telefone: normalizePhoneForPayload(phone),
        situacao,
        ciente_consulta_particular: situacao === "pronto",
        ...trackingParams,
      })
    }
    setIsSubmitting(true)

    // Envia lead via rota de API interna (evita CORS do browser → n8n)
    await sendLeadClickToWebhook({
      form_id: FORM_ID,
      codi_id: CODI_ID,
      nome: name,
      email,
      telefone: normalizePhoneForPayload(phone),
      objetivo: objective,
      objetivo_outro: isOther ? otherObjective : "",
      situacao,
      ciente_consulta_particular: situacao === "pronto",
      origem: "formulario-modal",
      pagina: typeof window !== "undefined" ? window.location.href : "",
      data: new Date().toISOString(),
      ...trackingParams,
    })

    setIsSubmitting(false)

    if (situacao === "plano") {
      onClose()
      resetForm()
      router.push(flow.porQueParticularPath)
      return
    }

    const message = `Olá! Meu nome é ${name} e gostaria de agendar uma consulta. Tenho interesse em: ${whatsappObjective}. Estou pronto(a) para investir na minha saúde com consulta particular e confirmo ciência de que o atendimento é particular.`
    const whatsappUrl = buildWhatsAppApiUrl({ message, tracking: trackingParams })

    storeWhatsappRedirectUrl(whatsappUrl)

    const query = typeof window !== "undefined" ? window.location.search : ""
    onClose()
    resetForm()
    router.push(`${flow.obrigadoPath}${query}`)
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setObjective("")
    setOtherText("")
    setSituacao("")
    setAgreed(true)
    setIsDropdownOpen(false)
    setDdi("+55")
    setDdiOpen(false)
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
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} onFocusCapture={handleFormStart} autoComplete="off" className="space-y-4">
              <input type="hidden" name="utm_source" value={trackingParams.utm_source} />
              <input type="hidden" name="utm_medium" value={trackingParams.utm_medium} />
              <input type="hidden" name="utm_campaign" value={trackingParams.utm_campaign} />
              <input type="hidden" name="utm_term" value={trackingParams.utm_term} />
              <input type="hidden" name="utm_content" value={trackingParams.utm_content} />
              <input type="hidden" name="utm_id" value={trackingParams.utm_id} />
              <input type="hidden" name="gclid" value={trackingParams.gclid} />
              <input type="hidden" name="gbraid" value={trackingParams.gbraid} />
              <input type="hidden" name="gad_source" value={trackingParams.gad_source} />
              <input type="hidden" name="gad_campaignid" value={trackingParams.gad_campaignid} />
              <input type="hidden" name="fbclid" value={trackingParams.fbclid} />
              <input type="hidden" name="device" value={trackingParams.device} />

              {/* Name input */}
              <div className="relative">
                <input
                  id="form-field-nome"
                  name="nome"
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="off"
                  className="peer w-full px-4 pt-5 pb-2 text-base md:text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label
                  htmlFor="form-field-nome"
                  className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary"
                >
                  Nome completo
                </label>
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  id="form-field-email"
                  name="email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="peer w-full px-4 pt-5 pb-2 text-base md:text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label
                  htmlFor="form-field-email"
                  className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base md:peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-primary"
                >
                  E-mail
                </label>
              </div>

              {/* Phone input with DDI */}
              <div className="relative" ref={ddiRef}>
                <label
                  htmlFor="form-field-telefone"
                  className="absolute left-4 top-1.5 text-[10px] text-primary font-medium pointer-events-none z-10"
                >
                  WhatsApp
                </label>
                <div className="flex items-stretch border border-border rounded-xl bg-muted/30 focus-within:border-primary focus-within:bg-white transition-all duration-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDdiOpen((prev) => !prev)}
                    className="self-stretch flex items-center gap-1.5 pl-4 pr-3 border-r border-border/60 shrink-0 hover:bg-muted/60 transition-colors"
                  >
                    <span className="text-sm leading-none">{DDI_OPTIONS.find((d) => d.code === ddi)?.flag}</span>
                    <span className="text-xs font-medium text-foreground">{ddi}</span>
                    <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", ddiOpen && "rotate-180")} />
                  </button>
                  <input
                    id="form-field-telefone"
                    name="telefone"
                    type="tel"
                    placeholder={ddi === "+55" ? "(00) 00000-0000" : "Número"}
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    autoComplete="off"
                    className="flex-1 px-3 pt-5 pb-2 text-base md:text-sm text-foreground bg-transparent focus:outline-none placeholder:text-muted-foreground/40"
                  />
                </div>
                {phoneHasCountryCode && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-600">
                    <span className="leading-none mt-px">⚠️</span>
                    <span>Não inclua o +55. O código do país já está selecionado.</span>
                  </p>
                )}
                {ddiOpen && (
                  <div className="absolute z-40 top-full left-0 mt-1.5 bg-white border border-border rounded-xl shadow-xl overflow-hidden w-52">
                    <div className="max-h-52 overflow-y-auto divide-y divide-border/50">
                      {DDI_OPTIONS.map((d) => (
                        <button
                          key={d.code}
                          type="button"
                          onClick={() => {
                            setDdi(d.code)
                            setDdiOpen(false)
                            setPhone("")
                          }}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors",
                            ddi === d.code
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted/60"
                          )}
                        >
                          <span className="text-base">{d.flag}</span>
                          <span className="flex-1">{d.label}</span>
                          <span className="text-xs text-muted-foreground">{d.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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

              {/* Situação atual */}
              <div className="space-y-2">
                <p className="text-[10px] text-primary font-medium leading-relaxed">
                  Qual é a sua situação atual?
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSituacao("pronto")}
                    className={cn(
                      "w-full py-3 px-3 rounded-xl text-left text-sm font-medium border transition-all duration-200 leading-snug",
                      situacao === "pronto"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    ✅ Estou pronto(a) para investir na minha saúde com consulta particular
                  </button>
                  <button
                    type="button"
                    onClick={() => setSituacao("plano")}
                    className={cn(
                      "w-full py-3 px-3 rounded-xl text-left text-sm font-medium border transition-all duration-200 leading-snug",
                      situacao === "plano"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    🕐 Tenho interesse, mas hoje só consigo pelo plano de saúde
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
                  {isSubmitting ? "Enviando..." : submitLabel}
                </CTAButton>
              </div>

          </form>
        </div>
      </div>
    </div>
  )
}
