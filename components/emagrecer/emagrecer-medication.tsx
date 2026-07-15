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
            Medicamentos para emagrecimento: quando podem ser indicados?
          </h2>
        </div>

        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>
            Nem toda consulta com a endocrinologista resulta na prescrição de medicamentos — e isso faz parte de um cuidado responsável e individualizado.
          </p>
          <p>
            Em muitos casos, o primeiro passo é compreender a sua história, investigar possíveis causas, solicitar exames e construir, em conjunto, um plano de tratamento adequado às suas necessidades.
          </p>
          <p>
            Quando existe indicação clínica, os medicamentos podem fazer parte da estratégia terapêutica. Essa decisão é sempre tomada de forma criteriosa, considerando seu histórico de saúde, os resultados dos exames, os potenciais benefícios, os riscos envolvidos e o acompanhamento contínuo ao longo do processo.
          </p>
          <p className="text-foreground font-medium">
            A Dra. Tainã Aci não realiza prescrições sem avaliação médica. A consulta é o momento de entender o seu contexto, esclarecer dúvidas e definir, com segurança, o tratamento mais adequado para você.
          </p>
        </div>
      </div>
    </section>
  )
}
