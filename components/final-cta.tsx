"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/ui/cta-button"

interface FinalCTAProps {
  onOpenModal: () => void
  whatsappDirect?: boolean
}

export function FinalCTA({ onOpenModal, whatsappDirect = false }: FinalCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-foreground">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 text-center max-w-3xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 text-balance">
          Agenda com número reduzido de pacientes por semana
        </h2>
        <p className="text-lg text-white/70 mb-10 leading-relaxed">
          Para manter a qualidade do atendimento, a Dra. Tainã reserva um número limitado de vagas semanais. Se você chegou até aqui, este pode ser o momento de iniciar um cuidado mais atento, individualizado e orientado por evidências para a sua saúde
        </p>

        <div className="space-y-4">
          <CTAButton onClick={onOpenModal} className="text-base h-14 ps-8 pe-16 hover:ps-16 hover:pe-8">
            {whatsappDirect ? "Falar pelo WhatsApp" : "Quero garantir minha vaga"}
          </CTAButton>
          <p className="text-sm text-white/60">
            {whatsappDirect
              ? "Abra uma conversa direto no WhatsApp"
              : "Nossa equipe entrará em contato pelo WhatsApp imediatamente"}
          </p>
        </div>
      </div>
    </section>
  )
}
