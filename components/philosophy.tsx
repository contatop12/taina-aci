"use client"

import { useEffect, useRef, useState } from "react"
import { InstagramStories } from "./instagram-stories"

export function Philosophy() {
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
    <section className="py-24 lg:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-4xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-6">
            Nossa Filosofia
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-8 text-balance">
            Não é sobre emagrecer rápido. É sobre tratar a causa.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A maioria dos pacientes já tentou dietas, treinos e soluções rápidas. Aqui, o foco é entender profundamente o seu metabolismo, seus hormônios e seu histórico — para construir resultados que realmente se sustentam ao longo do tempo.
          </p>
        </div>

        {/* Instagram Stories Highlight */}
        <div className="flex justify-center">
          <InstagramStories />
        </div>
      </div>
    </section>
  )
}
