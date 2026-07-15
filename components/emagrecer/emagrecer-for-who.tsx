"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

const audiences = [
  "Pessoas com sobrepeso ou obesidade que buscam acompanhamento médico",
  "Pessoas que não conseguem emagrecer apesar de dieta e exercício",
  "Pessoas com efeito sanfona recorrente",
  "Pessoas com resistência à insulina diagnosticada ou suspeita",
  "Pessoas com pré-diabetes ou diabetes tipo 2",
  "Pessoas com alterações de colesterol ou triglicerídeos",
  "Pessoas com suspeita de alteração hormonal ou da tireoide",
  "Pessoas que querem emagrecer com segurança e acompanhamento médico",
]

export function EmagrecerForWho() {
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
    <section className="py-12 md:py-24 lg:py-32 bg-muted">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Indicação
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Para quem é indicada a consulta com endocrinologista para emagrecimento?
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {audiences.map((text, index) => (
            <div
              key={text}
              className="flex items-start gap-4 bg-card p-5 rounded-xl shadow-sm"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <p className="text-sm text-card-foreground leading-relaxed pt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
