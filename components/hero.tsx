"use client"

import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"

interface HeroProps {
  onOpenModal: () => void
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section>

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden pt-[70px]">

        {/* Photo — max 300px */}
        <div className="relative w-full h-[300px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20TAINA1-2BJX8A68XuuPN4jOi6zgOVMJXZUqd7.jpg"
            alt="Dra. Tainã Aci em seu consultório"
            fill
            className="object-cover object-top"
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
              Vila Mariana · São Paulo
            </span>
          </div>

          <h1 className="text-[2rem] leading-[1.15] font-serif text-foreground">
            Endocrinologia<br />
            <span className="text-primary">& Metabologia</span>
          </h1>

          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Emagrecimento, Hormônios e Saúde Metabólica com embasamento científico.
          </p>

          {/* credentials — now below subtitle */}
          <div className="pt-1">
            <p className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold mb-1">
              Endocrinologista
            </p>
            <p className="text-sm text-foreground font-medium">
              CRM 166519 · RQE 81061
            </p>
          </div>

          <div className="pt-2">
            <CTAButton onClick={onOpenModal} size="sm">
              Fale com nossa equipe
            </CTAButton>
          </div>

          <p className="text-xs text-muted-foreground">
            Nossa equipe entrará em contato pelo WhatsApp
          </p>
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="hidden lg:flex items-center min-h-[100svh]">
        <div className="container mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="order-2">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20TAINA1-2BJX8A68XuuPN4jOi6zgOVMJXZUqd7.jpg"
                  alt="Dra. Tainã Aci em seu consultório"
                  width={600}
                  height={750}
                  className="rounded-2xl shadow-xl object-cover w-full"
                  priority
                />
              </div>
            </div>

            <div className="order-1 space-y-8 text-left">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-serif leading-tight text-balance">
                  Endocrinologista na Vila Mariana
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Emagrecimento, Hormônios e Saúde Metabólica
                </p>
              </div>

              <div>
                <CTAButton onClick={onOpenModal} size="lg">
                  Fale com nossa equipe
                </CTAButton>
              </div>

              <p className="text-sm text-muted-foreground">
                Nossa equipe entrará em contato pelo WhatsApp
              </p>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">CRM 166519</span>
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-primary">RQE 81061</span>
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-sm text-muted-foreground">Membro SBEM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
