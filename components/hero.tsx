"use client"

import { CTAButton } from "@/components/ui/cta-button"
import { HeroBackgroundVideo } from "@/components/hero-background-video"
import { HeroPortraitMedia } from "@/components/hero-portrait-media"

interface HeroProps {
  onOpenModal: () => void
  whatsappDirect?: boolean
}

export function Hero({ onOpenModal, whatsappDirect = false }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden lg:min-h-svh">
      <div className="absolute inset-0 z-0 hidden lg:block">
        <HeroBackgroundVideo />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] hidden bg-white/90 lg:block" />

      {/* ── MOBILE layout ── */}
      <div className="relative z-10 min-h-svh lg:hidden">
        <div className="absolute inset-0">
          <HeroPortraitMedia priority sizes="100vw" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
        </div>

        <div className="relative z-10 flex min-h-svh flex-col justify-end px-5 pb-[max(6.5rem,env(safe-area-inset-bottom)+5rem)] pt-[calc(70px+env(safe-area-inset-top))]">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="block h-px w-5 bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                Vila Mariana · São Paulo
              </span>
            </div>

            <h1 className="font-serif text-[1.85rem] leading-[1.12] text-white sm:text-[2rem]">
              Endocrinologista
              <br />
              <span className="text-[#C8D89A]">na Vila Mariana</span>
            </h1>

            <p className="max-w-[20rem] text-[15px] leading-relaxed text-white/85">
              Emagrecimento, Hormônios e Saúde Metabólica com embasamento científico.
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Endocrinologista · CRM 166519 · RQE 81061
            </p>

            <div className="pt-1">
              <CTAButton onClick={onOpenModal} size="sm" fullWidth>
                {whatsappDirect ? "Falar pelo WhatsApp" : "Fale com nossa equipe"}
              </CTAButton>
            </div>

            <p className="text-xs text-white/65">
              {whatsappDirect
                ? "Abra uma conversa direto no WhatsApp"
                : "Nossa equipe entrará em contato pelo WhatsApp"}
            </p>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="relative z-10 hidden min-h-svh items-center lg:flex">
        <div className="container mx-auto px-8 py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="order-1 space-y-8 text-left">
              <div className="space-y-6">
                <div className="flex items-center gap-2" data-gsap-hero-item>
                  <span className="block h-px w-5 bg-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Vila Mariana · São Paulo
                  </span>
                </div>

                <h1 className="font-serif text-5xl leading-tight text-balance lg:text-6xl" data-gsap-hero-item>
                  Endocrinologista{" "}
                  <span className="text-primary">na Vila Mariana</span>
                </h1>
                <p className="max-w-xl text-xl leading-relaxed text-muted-foreground" data-gsap-hero-item>
                  Emagrecimento, Hormônios e Saúde Metabólica com embasamento científico.
                </p>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary" data-gsap-hero-item>
                  Endocrinologista · CRM 166519 · RQE 81061
                </p>
              </div>

              <div data-gsap-hero-item>
                <CTAButton onClick={onOpenModal} size="lg">
                  {whatsappDirect ? "Falar pelo WhatsApp" : "Fale com nossa equipe"}
                </CTAButton>
              </div>

              <p className="text-sm text-muted-foreground">
                {whatsappDirect
                  ? "Abra uma conversa direto no WhatsApp"
                  : "Nossa equipe entrará em contato pelo WhatsApp"}
              </p>

              <div className="flex flex-wrap gap-3 border-t border-border pt-4">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">CRM 166519</span>
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">RQE 81061</span>
                </span>
                <span className="text-muted-foreground/50">|</span>
                <span className="text-sm text-muted-foreground">Membro SBEM</span>
              </div>
            </div>

            <div className="order-2">
              <div className="relative aspect-[4/5] w-full" data-gsap-hero-image>
                <HeroPortraitMedia
                  className="h-full w-full rounded-2xl shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
