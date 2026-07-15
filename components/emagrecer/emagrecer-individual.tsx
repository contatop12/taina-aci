"use client"

import { useEffect, useRef, useState } from "react"

export function EmagrecerIndividual() {
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
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-3xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Avaliação individualizada
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Emagrecimento não tem fórmula única
          </h2>
        </div>

        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            O que funciona para uma pessoa pode não funcionar para outra — e isso tem base clínica. Fatores como genética, histórico de saúde, exames laboratoriais, sono, estresse, uso de medicamentos e condições metabólicas influenciam diretamente o processo de perda de peso.
          </p>
          <p>
            A consulta com endocrinologista parte da investigação completa do seu caso. Não existe protocolo genérico: o acompanhamento é baseado no que os seus exames e o seu histórico mostram.
          </p>
        </div>

        <blockquote className="mt-12 rounded-2xl bg-muted border-l-4 border-primary px-7 py-8">
          <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed text-balance">
            “A avaliação endocrinológica não é sobre seguir uma dieta. É sobre entender o que está acontecendo no seu organismo.”
          </p>
        </blockquote>
      </div>
    </section>
  )
}
