"use client"

import { useEffect, useRef, useState } from "react"
import { Pill } from "lucide-react"

export function EmagrecerMedication() {
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
    <section className="py-24 lg:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-3xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Pill className="w-7 h-7 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Medicamentos para emagrecimento: quando são indicados?
          </h2>
        </div>

        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            Nem toda consulta com endocrinologista termina com prescrição de medicamento — e tudo bem. Em muitos casos, o tratamento começa com investigação clínica, ajuste de exames, orientações e acompanhamento.
          </p>
          <p>
            Quando há indicação clínica, o tratamento pode incluir estratégias terapêuticas medicamentosas. Mas essa decisão é sempre individualizada: considera o histórico de saúde, os resultados dos exames, os riscos, os benefícios e o acompanhamento contínuo.
          </p>
          <p className="text-foreground font-medium">
            A Dra. Tainã Aci não prescreve sem avaliação. A consulta é o ponto de partida para entender o que faz sentido para o seu caso.
          </p>
        </div>
      </div>
    </section>
  )
}
