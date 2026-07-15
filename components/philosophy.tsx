"use client"

import { InstagramStories } from "./instagram-stories"
import { Ripple } from "@/components/ui/ripple"

export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-20 lg:py-32">
      <Ripple className="opacity-40" />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16" data-gsap-reveal>
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-6">
            Nossa Filosofia
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 text-balance">
            Emagrecimento com ciência, para resultados que permanecem.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Tratar obesidade vai além de orientações genéricas. Aqui, cada paciente é avaliado de forma individual, com exames modernos e tratamento baseado em evidências científicas, considerando o metabolismo, perfil hormonal e histórico de saúde. O acompanhamento é parte fundamental do processo para garantir resultados sustentáveis e evitar o reganho de peso e efeito sanfona.
          </p>
        </div>

        <div className="flex justify-center" data-gsap-carousel>
          <InstagramStories />
        </div>
      </div>
    </section>
  )
}
