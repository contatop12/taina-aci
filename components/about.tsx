"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"
import { Check } from "lucide-react"

interface AboutProps {
  onOpenModal: () => void
}

const credentials = [
  "Residência em Clínica Médica — Hospital do Servidor Público Municipal de SP",
  "Residência em Endocrinologia — Hospital Santa Marcelina",
  "Especialista pela SBEM",
  "Membro da Endocrine Society (EUA)",
  "Pós-graduada em Nutrologia — ABRAN",
  "Fellow Research — McGill University, Canadá",
  "Professora de Medicina — USCS",
]

export function About({ onOpenModal }: AboutProps) {
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
    <section id="sobre" className="py-24 lg:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20TAINA2-3lI4a8wwQ6emnGVlVeFeAEmZ4pYkMe.jpg"
              alt="Dra. Tainã Aci"
              width={500}
              height={650}
              className="rounded-2xl shadow-xl object-cover w-full max-w-md mx-auto lg:mx-0"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
                Sobre a Dra. Tainã Aci
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
                Uma médica que escolheu a endocrinologia por paixão — não por acaso
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pacientes, alunos e amigos são testemunhas da minha paixão pela medicina. Após formação em Clínica Médica, encontrei na endocrinologia minha verdadeira realização profissional.
              </p>
              <p>
                Hoje, além de atender pacientes com dedicação e acolhimento, sou professora universitária de medicina e exercito uma prática baseada em evidências científicas.
              </p>
            </div>

            <div className="space-y-3">
              {credentials.map((credential) => (
                <div key={credential} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{credential}</span>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-foreground">
              CRM: 166519 | RQE: 81061
            </p>

            <CTAButton onClick={onOpenModal}>
              Fale com nossa equipe
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
