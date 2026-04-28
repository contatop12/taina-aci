"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Target, Microscope, Users } from "lucide-react"

const benefits = [
  { icon: Clock, text: "Tempo real de escuta e vínculo" },
  { icon: Target, text: "Estratégia 100% personalizada" },
  { icon: Microscope, text: "Acesso a tecnologias e exames avançados" },
  { icon: Users, text: "Acompanhamento próximo e contínuo" },
]

export function WhyPrivate() {
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
        className={`container mx-auto px-4 lg:px-8 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 text-balance">
          Por que o atendimento é exclusivamente particular?
        </h2>
        <p className="text-xl text-white/70 mb-12">
          Porque saúde de qualidade não cabe em 10 minutos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.text}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <benefit.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
              <p className="text-white font-medium">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
