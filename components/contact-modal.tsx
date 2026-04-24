"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Check, MessageCircle, ChevronDown } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"
import { cn } from "@/lib/utils"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const objectives = [
  "Emagrecimento e Tratamento da Obesidade",
  "Saúde Hormonal Feminina e Menopausa",
  "Saúde Hormonal Masculina e Testosterona",
  "Acompanhamento Pós-Bariátrica (Reposição e Manutenção)",
  "Acompanhamento Metabólico e Hormonal na Gestação",
  "Tratamento de Diabetes (Tipo 1, 2 e Gestacional)",
  "Controle de Distúrbios da Tireoide",
  "Prevenção, Longevidade e Check-up Hormonal",
  "Hipertrofia e Ganho de Massa Magra",
  "Controle de Colesterol e Triglicerídeos",
  "Outro",
]

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [objective, setObjective] = useState("")
  const [otherText, setOtherText] = useState("")
  const [agreed, setAgreed] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isOther = objective === "Outro"
  const otherObjective = otherText.trim()
  const whatsappObjective = isOther ? (otherObjective || "Outro") : objective
  const isFormValid = !!name && !!phone && !!objective && (!isOther || !!otherText.trim()) && agreed

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)

    // Envia lead via rota de API interna (evita CORS do browser → n8n)
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name,
          telefone: normalizePhoneForPayload(phone),
          objetivo: objective,
          objetivo_outro: isOther ? otherObjective : "",
          origem: "formulario-modal",
          pagina: typeof window !== "undefined" ? window.location.href : "",
          data: new Date().toISOString(),
        }),
      })
    } catch (_) {
      // Falha silenciosa — não impede o fluxo do usuário
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      const whatsappNumber = "5511951515103"
      const message = encodeURIComponent(
        `Olá! Meu nome é ${name} e gostaria de agendar uma consulta. Meu objetivo principal é: ${whatsappObjective}.`
      )
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      onClose()
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setObjective("")
    setOtherText("")
    setAgreed(true)
    setIsSubmitted(false)
    setIsDropdownOpen(false)
  }

  const handleClose = () => {
    onClose()
    if (isSubmitted) resetForm()
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

        <div className="px-8 pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-7">
            <Image
              src="https://odisewmgwxgjhqhsznuv.supabase.co/storage/v1/object/public/taina-stories/logo-principal.png"
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

          {/* Success state */}
          {isSubmitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-40" />
                <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-9 h-9 text-primary" strokeWidth={2} />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-serif text-foreground">Recebemos seu contato!</p>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  Nossa equipe já foi notificada e entrará em contato em instantes pelo WhatsApp.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#25D366]">
                <MessageCircle className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">Abrindo WhatsApp...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="peer w-full px-4 pt-5 pb-2 text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-primary">
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
                  className="peer w-full px-4 pt-5 pb-2 text-sm border border-border rounded-xl bg-muted/30 text-foreground placeholder-transparent focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                />
                <label className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-primary">
                  WhatsApp
                </label>
              </div>

              {/* Objective dropdown */}
              <div ref={dropdownRef} className="relative">
                {/* Label fixa acima */}
                <p className="text-[10px] uppercase tracking-widest text-primary font-medium mb-1.5">
                  Objetivo principal
                </p>

                {/* Trigger */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((v) => !v)}
                  className={cn(
                    "w-full px-4 py-3.5 text-sm border rounded-xl bg-muted/30 text-left flex items-center justify-between gap-3 transition-all duration-200 focus:outline-none",
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
                      className="peer w-full px-4 pt-5 pb-2 text-sm border border-primary rounded-xl bg-primary/5 text-foreground placeholder-transparent focus:outline-none focus:bg-white transition-all duration-200"
                    />
                    <label className="absolute left-4 top-1.5 text-[10px] uppercase tracking-widest text-primary font-medium pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-muted-foreground peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:text-primary">
                      Descreva seu objetivo
                    </label>
                  </div>
                )}
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
          )}
        </div>
      </div>
    </div>
  )
}
