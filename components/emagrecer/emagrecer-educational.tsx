"use client"

import { useEffect, useRef, useState } from "react"

const paragraphs = [
  "A resistência à insulina é uma condição frequente e pode influenciar a forma como o organismo utiliza e armazena energia.",
  "Quando as células respondem menos à ação da insulina, podem ocorrer alterações metabólicas associadas ao aumento da glicemia, ao acúmulo de gordura abdominal e à maior dificuldade para perder peso.",
  "Alterações hormonais, como o hipotireoidismo, também podem impactar o metabolismo. Em alguns casos, uma redução da função da tireoide pode contribuir para sintomas como cansaço, diminuição da disposição e mudanças no gasto energético.",
  "Outro fator importante é a síndrome metabólica, caracterizada pela associação entre obesidade abdominal, alterações da glicose, pressão arterial elevada e desequilíbrios nos níveis de colesterol e triglicerídeos.",
  "A avaliação endocrinológica considera todos esses aspectos de forma integrada. Compreender o que influencia o seu metabolismo é o primeiro passo para definir um tratamento individualizado e alinhado aos seus objetivos.",
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
        className={`container mx-auto px-4 lg:px-8 max-w-3xl transition-all duration-700 ${
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

        <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
