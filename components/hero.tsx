"use client"

import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"

interface HeroProps {
  onOpenModal: () => void
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="min-h-[100svh]">

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden flex flex-col min-h-[100svh]">

        {/* Photo — cinematic top block */}
        <div className="relative h-[62svh] w-full flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20TAINA1-2BJX8A68XuuPN4jOi6zgOVMJXZUqd7.jpg"
            alt="Dra. Tainã Aci em seu consultório"
            fill
            className="object-cover object-top"
            priority
          />
          {/* gradient fade into card below */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-background" />

          {/* floating credential badge — top left */}
          <div className="absolute top-16 left-4 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-sm">
            <p className="text-[10px] uppercase tracking-widest text-primary font-semibold">Endocrinologista</p>
            <p className="text-[11px] text-foreground font-medium">CRM 166519 · RQE 81061</p>
          </div>
        </div>

        {/* Content card — overlaps photo */}
        <div className="relative -mt-6 bg-background rounded-t-[2rem] flex-1 px-6 pt-7 pb-32 space-y-5 shadow-[0_-8px_32px_rgba(0,0,0,0.06)]">

          {/* small eyebrow */}
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

          <CTAButton onClick={onOpenModal} className="text-[15px] h-13">
            Fale com nossa equipe
          </CTAButton>

          <p className="text-xs text-muted-foreground">
            Nossa equipe entrará em contato pelo WhatsApp
          </p>

          {/* credential badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
              Membro SBEM
            </span>
            <span className="text-[11px] bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
              Fellow McGill University
            </span>
            <span className="text-[11px] bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
              Professora de Medicina
            </span>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (unchanged) ── */}
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
                <CTAButton onClick={onOpenModal} className="text-base h-14 ps-8 pe-16 hover:ps-16 hover:pe-8">
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
