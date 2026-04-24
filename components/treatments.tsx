"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/ui/cta-button"
import { Scale, Heart, User, Activity, Baby, Droplets, Zap, Shield } from "lucide-react"

interface TreatmentsProps {
  onOpenModal: () => void
}

const treatments = [
  {
    icon: Scale,
    title: "Obesidade",
    description: "Tratamento médico completo com foco em emagrecimento sustentável",
  },
  {
    icon: Heart,
    title: "Menopausa",
    description: "Controle dos sintomas e melhora da composição corporal",
  },
  {
    icon: User,
    title: "Hormônios Masculinos",
    description: "Diagnóstico e tratamento da deficiência de testosterona em homens",
  },
  {
    icon: Activity,
    title: "Pós-Bariátrica",
    description: "Acompanhamento especializado para reposição de vitaminas, manutenção do peso perdido e tratamento do reganho de peso caso aconteça",
  },
  {
    icon: Baby,
    title: "Gestação",
    description: "Acompanhamento, suplementação, prevenção e tratamento do diabetes gestacional e disfunções da tireoide",
  },
  {
    icon: Droplets,
    title: "Diabetes",
    description: "Manejo clínico moderno e individualizado",
  },
  {
    icon: Zap,
    title: "Tireoide",
    description: "Diagnóstico preciso e tratamento personalizado",
  },
  {
    icon: Shield,
    title: "Prevenção",
    description: "Para quem quer otimizar saúde antes dos sintomas aparecerem",
  },
]

export function Treatments({ onOpenModal }: TreatmentsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="especialidades" className="py-24 lg:py-32 bg-muted">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Tratamentos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Para quem é o acompanhamento da Dra. Tainã?
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {treatments.map((treatment, index) => (
            <div
              key={treatment.title}
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <treatment.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-card-foreground">{treatment.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {treatment.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton onClick={onOpenModal}>
            Quero saber qual tratamento é para mim
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
