"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"

interface EmagrecerHeroProps {
  onOpenModal: () => void
}

const seals = [
  "Atendimento particular",
  "Vila Mariana, São Paulo",
  "Avaliação individualizada",
  "Endocrinologia & Metabologia",
]

export function EmagrecerHero({ onOpenModal }: EmagrecerHeroProps) {
  return (
    <section>

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden pt-[70px]">

        {/* Photo — max 300px */}
        <div className="relative w-full h-[300px]">
          <Image
            src="https://pub-fab1140cac404905a5537d13579c2404.r2.dev/foto-taina1.webp"
            alt="Dra. Tainã Aci, endocrinologista para emagrecer em São Paulo"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Content */}
        <div className="px-6 pt-8 pb-12 space-y-5">

          {/* eyebrow */}
          <div className="flex items-center gap-2">
            <span className="block w-5 h-px bg-primary" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
              Consulta Particular · Vila Mariana, São Paulo
            </span>
          </div>

          <h1 className="text-[2rem] leading-[1.15] font-serif text-foreground">
            Endocrinologista<br />
            <span className="text-primary">para emagrecer em São Paulo</span>
          </h1>

          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Dificuldade para perder peso pode ter causas clínicas e metabólicas. A avaliação com endocrinologista investiga o que está por trás do seu processo — e define a melhor estratégia para o seu caso.
          </p>

          <div className="pt-2 space-y-3">
            <CTAButton onClick={onOpenModal} size="sm">
              Agendar avaliação
            </CTAButton>
            <button
              onClick={onOpenModal}
              className="block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              Falar com a equipe pelo WhatsApp
            </button>
          </div>

          {/* trust seals */}
          <ul className="pt-3 grid grid-cols-1 gap-2">
            {seals.map((seal) => (
              <li key={seal} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                {seal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:flex items-center min-h-[100svh]">
        <div className="container mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="order-2">
              <div className="relative">
                <Image
                  src="https://pub-fab1140cac404905a5537d13579c2404.r2.dev/foto-taina1.webp"
                  alt="Dra. Tainã Aci, endocrinologista para emagrecer em São Paulo"
                  width={600}
                  height={750}
                  className="rounded-2xl shadow-xl object-cover w-full"
                  priority
                />
              </div>
            </div>

            <div className="order-1 space-y-8 text-left">
              <div className="flex items-center gap-2">
                <span className="block w-5 h-px bg-primary" />
                <span className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                  Consulta Particular · Vila Mariana, São Paulo
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-serif leading-tight text-balance">
                  Endocrinologista para emagrecer em São Paulo
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Dificuldade para perder peso pode ter causas clínicas e metabólicas. A avaliação com endocrinologista investiga o que está por trás do seu processo — e define a melhor estratégia para o seu caso.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <CTAButton onClick={onOpenModal} size="lg">
                  Agendar avaliação
                </CTAButton>
                <button
                  onClick={onOpenModal}
                  className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                >
                  Falar com a equipe pelo WhatsApp
                </button>
              </div>

              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-border">
                {seals.map((seal) => (
                  <li key={seal} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={2.5} />
                    {seal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
