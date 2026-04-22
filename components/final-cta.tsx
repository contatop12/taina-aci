"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface FinalCTAProps {
  onOpenModal: () => void
}

export function FinalCTA({ onOpenModal }: FinalCTAProps) {
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
          Para manter a qualidade do atendimento, a Dra. Tainã reserva um número limitado de vagas semanais. Se você chegou até aqui, é porque está pronto para cuidar da sua saúde de verdade.
        </p>

        <div className="space-y-4">
          <Button
            onClick={onOpenModal}
            size="lg"
            className="bg-[#AABB6A] hover:bg-[#9AAB5A] text-white font-medium px-10 py-7 text-lg"
          >
            Quero garantir minha vaga
          </Button>
          <p className="text-sm text-white/60">
            Nossa equipe entrará em contato pelo WhatsApp imediatamente
          </p>
        </div>
      </div>
    </section>
  )
}
