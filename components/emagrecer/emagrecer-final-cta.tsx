"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/ui/cta-button"

interface EmagrecerFinalCTAProps {
  onOpenModal: () => void
}

export function EmagrecerFinalCTA({ onOpenModal }: EmagrecerFinalCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
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
          Agende sua consulta com endocrinologista
        </h2>
        <p className="text-lg text-white/70 mb-3 leading-relaxed">
          Se você busca acompanhamento médico para emagrecimento, obesidade ou alterações metabólicas, a consulta com a Dra. Tainã Aci é o primeiro passo para entender o que está por trás do seu processo.
        </p>
        <p className="text-lg text-white/70 mb-10 leading-relaxed">
          Atendimento particular na Vila Mariana, em São Paulo.
        </p>

        <div className="space-y-4">
          <CTAButton onClick={onOpenModal} className="text-base h-14 ps-8 pe-16 hover:ps-16 hover:pe-8">
            Falar com a equipe agora
          </CTAButton>
          <p className="text-sm text-white/60">
            Particular · Vila Mariana, São Paulo · Endocrinologia &amp; Metabologia
          </p>
        </div>
      </div>
    </section>
  )
}
