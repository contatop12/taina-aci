"use client"

import { useEffect, useRef, useState } from "react"
import {
  Stethoscope,
  FlaskConical,
  Activity,
  TrendingUp,
  Scale,
  Droplets,
  HeartPulse,
  Pill,
} from "lucide-react"

const items = [
  {
    icon: Stethoscope,
    title: "Avaliação clínica completa",
    description: "Histórico de saúde, peso, hábitos e fatores de risco.",
  },
  {
    icon: FlaskConical,
    title: "Interpretação de exames",
    description: "Glicemia, insulina, colesterol, triglicerídeos, TSH e outros.",
  },
  {
    icon: Activity,
    title: "Tireoide",
    description: "Alterações de hipotireoidismo e hipertireoidismo que afetam o metabolismo.",
  },
  {
    icon: TrendingUp,
    title: "Resistência à insulina",
    description: "Uma das principais causas de dificuldade para emagrecer.",
  },
  {
    icon: Scale,
    title: "Obesidade e sobrepeso",
    description: "Diagnóstico e acompanhamento da doença.",
  },
  {
    icon: Droplets,
    title: "Pré-diabetes e diabetes tipo 2",
    description: "Avaliação metabólica e de risco.",
  },
  {
    icon: HeartPulse,
    title: "Síndrome metabólica",
    description: "Conjunto de fatores que aumentam risco cardiovascular e dificultam o peso.",
  },
  {
    icon: Pill,
    title: "Tratamento individualizado",
    description: "Quando indicado, estratégias terapêuticas baseadas no seu perfil.",
  },
]

export function EmagrecerHelp() {
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
    <section className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance mb-8">
            Como uma endocrinologista pode ajudar no emagrecimento?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A endocrinologista é a médica especializada em hormônios, metabolismo e doenças relacionadas. No contexto do emagrecimento, ela investiga causas que nem sempre aparecem em consultas genéricas.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-4 bg-muted/50 border border-border/40 rounded-2xl p-5"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-14">
          Cada caso é único. A consulta com a Dra. Tainã Aci considera o seu histórico completo para definir o caminho mais adequado.
        </p>
      </div>
    </section>
  )
}
