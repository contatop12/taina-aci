"use client"

import { useEffect, useRef, useState } from "react"

const paragraphs = [
  "A resistência à insulina é uma das condições mais frequentes em pessoas que têm dificuldade para emagrecer. Ela ocorre quando as células do organismo respondem menos à ação da insulina, o que pode levar ao acúmulo de gordura, aumento de glicemia e dificuldade progressiva para perder peso.",
  "Alterações na tireoide, como o hipotireoidismo, também impactam diretamente o metabolismo. Uma tireoide com funcionamento abaixo do ideal pode diminuir o gasto energético, causar cansaço e dificultar a perda de peso mesmo com esforço alimentar e físico.",
  "A síndrome metabólica é outro fator relevante: combinação de pressão alta, glicose elevada, alterações de gordura no sangue e obesidade abdominal que aumenta risco cardiovascular e torna o processo de emagrecimento mais complexo.",
  "Todos esses fatores são avaliados e tratados por endocrinologistas. A identificação correta do que está por trás da dificuldade para emagrecer é o ponto de partida para um tratamento que realmente faça sentido para o seu caso.",
]

export function EmagrecerEducational() {
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
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-4xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Entenda o seu metabolismo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Resistência à insulina, metabolismo e emagrecimento: qual é a relação?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
          {paragraphs.map((text) => (
            <p key={text} className="text-base text-muted-foreground leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
