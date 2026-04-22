"use client"

import { useEffect, useRef, useState } from "react"
import { Users, BookOpen, Microscope, Pill } from "lucide-react"

const differentials = [
  {
    icon: Users,
    title: "Consulta Médica + Nutricional Integrada",
    description:
      "Você não precisa marcar duas consultas separadas. A Dra. Tainã realiza o atendimento junto com nutricionista, otimizando seu tempo e potencializando seus resultados.",
  },
  {
    icon: BookOpen,
    title: "Medicina Baseada em Evidência",
    description:
      "Cada decisão clínica é fundamentada em ciência. Sem modismos, sem protocolos genéricos — apenas o que realmente funciona para o seu caso.",
  },
  {
    icon: Microscope,
    title: "Exames Avançados: Bioimpedância e Teste Genético",
    description:
      "Avaliação completa do seu metabolismo com tecnologia de ponta para um diagnóstico mais preciso e um plano mais eficaz.",
  },
  {
    icon: Pill,
    title: "Quando indicado: Medicamentos Modernos",
    description:
      "A Dra. Tainã pode prescrever, quando clinicamente indicado, medicamentos como Ozempic, Mounjaro, Wegovy e Rybelsus — sempre com acompanhamento seguro.",
  },
]

export function Differentials() {
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
    <section id="diferenciais" className="py-24 lg:py-32 bg-background">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Diferenciais
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Um modelo de consulta que você não encontra no convencional
          </h2>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-10 h-10 text-primary" />
              </div>
              <div className={`flex-1 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
