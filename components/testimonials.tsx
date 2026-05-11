"use client"

import { InstagramReelsCarousel } from "@/components/instagram-reels-carousel"

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-balance">
            Pacientes que decidiram investir na própria saúde
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados reais de pessoas reais.
          </p>
        </div>

        <InstagramReelsCarousel />
      </div>
    </section>
  )
}
