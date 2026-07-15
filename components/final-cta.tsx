"use client"

import { CTAButton } from "@/components/ui/cta-button"

interface FinalCTAProps {
  onOpenModal: () => void
  whatsappDirect?: boolean
}

export function FinalCTA({ onOpenModal, whatsappDirect = false }: FinalCTAProps) {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl" data-gsap-reveal>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 text-balance">
          Agenda com número reduzido de pacientes por semana
        </h2>
        <p className="text-lg text-white/70 mb-10 leading-relaxed">
          Para manter a qualidade do atendimento, a Dra. Tainã reserva um número limitado de vagas semanais. Se você chegou até aqui, este pode ser o momento de iniciar um cuidado mais atento, individualizado e orientado por evidências para a sua saúde
        </p>

        <div className="space-y-4">
          <CTAButton onClick={onOpenModal} className="text-base h-14 ps-8 pe-16 hover:ps-16 hover:pe-8">
            {whatsappDirect ? "Falar pelo WhatsApp" : "Quero garantir minha vaga"}
          </CTAButton>
          <p className="text-sm text-white/60">
            {whatsappDirect
              ? "Abra uma conversa direto no WhatsApp"
              : "Nossa equipe entrará em contato pelo WhatsApp imediatamente"}
          </p>
        </div>
      </div>
    </section>
  )
}
