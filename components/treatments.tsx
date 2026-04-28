"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/ui/cta-button"
import {
  Scale,
  Thermometer,
  Syringe,
  Stethoscope,
  Baby,
  Droplets,
  Zap,
  ShieldCheck,
} from "lucide-react"

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
    icon: Thermometer,
    title: "Menopausa",
    description: "Controle dos sintomas e melhora da composição corporal",
  },
  {
    icon: Syringe,
    title: "Hormônios Masculinos",
    description: "Diagnóstico e tratamento da deficiência de testosterona em homens",
  },
  {
    icon: Stethoscope,
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
    icon: ShieldCheck,
    title: "Prevenção",
    description: "Acompanhamento médico voltado à identificação precoce de alterações metabólicas e à otimização da saúde, com foco na redução de riscos e na promoção de qualidade de vida.",
  },
]

export function Treatments({ onOpenModal }: TreatmentsProps) {
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
              className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary/20">
                <treatment.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold mb-2 text-card-foreground">{treatment.title}</h3>
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
