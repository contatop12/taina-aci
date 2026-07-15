"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/ui/cta-button"

interface EmagrecerPainProps {
  onOpenModal: () => void
}

const painPoints = [
  {
    emoji: "🔄",
    title: "Efeito sanfona",
    description: "Perde peso, recupera, perde de novo, sem nunca sair do lugar.",
  },
  {
    emoji: "😓",
    title: "Fome constante",
    description: "Mesmo comendo nas horas certas, a fome não passa.",
  },
  {
    emoji: "😴",
    title: "Cansaço fora do comum",
    description: "Sensação de corpo pesado e energia baixa o tempo todo.",
  },
  {
    emoji: "📈",
    title: "Ganho de peso progressivo",
    description: "Peso aumentando sem mudança de hábitos clara.",
  },
  {
    emoji: "🧬",
    title: "Histórico familiar",
    description: "Casos de obesidade, diabetes ou resistência à insulina na família.",
  },
  {
    emoji: "🌀",
    title: "Alimentação controlada sem resultado",
    description: "Faz tudo \"certo\" e o peso não responde.",
  },
]

export function EmagrecerPain({ onOpenModal }: EmagrecerPainProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 lg:py-32 bg-muted">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Entender é o primeiro passo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance mb-8">
            Você se dedica, mas os resultados parecem não acompanhar seus esforços?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Muitas pessoas já tentaram diferentes estratégias — como ajustes na alimentação, prática de exercícios e mudanças de hábitos — e, ainda assim, sentem que o emagrecimento não evolui como esperado.
            </p>
            <p>
              Em alguns casos, fatores clínicos e metabólicos podem influenciar esse processo. Uma avaliação médica individualizada pode ajudar a compreender essas questões.
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-2xl">
                <span aria-hidden="true">{point.emoji}</span>
              </div>
              <h3 className="text-base font-semibold mb-2 text-card-foreground">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 space-y-6 max-w-2xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">
            Se você se reconhece em algum desses sinais, uma avaliação endocrinológica pode ajudar a esclarecer possíveis causas.
          </p>
          <CTAButton onClick={onOpenModal}>
            Quero agendar minha avaliação
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
