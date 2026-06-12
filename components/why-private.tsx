"use client"

import { Clock, Target, Microscope, Users } from "lucide-react"

const benefits = [
  { icon: Clock, text: "Tempo real de escuta e vínculo" },
  { icon: Target, text: "Estratégia 100% personalizada" },
  { icon: Microscope, text: "Acesso a tecnologias e exames avançados" },
  { icon: Users, text: "Acompanhamento próximo e contínuo" },
]

export function WhyPrivate() {
  return (
    <section className="py-24 lg:py-32 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <div data-gsap-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 text-balance">
            Por que o atendimento é exclusivamente particular?
          </h2>
          <p className="text-xl text-white/70 mb-12">
            Porque saúde de qualidade não cabe em 10 minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <div
              key={benefit.text}
              data-gsap-card
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
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
