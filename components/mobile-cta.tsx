"use client"

import { CTAButton } from "@/components/ui/cta-button"

interface MobileCTAProps {
  onOpenModal: () => void
}

export function MobileCTA({ onOpenModal }: MobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/95 backdrop-blur-sm border-t border-border md:hidden">
      <CTAButton onClick={onOpenModal} fullWidth>
        Fale com nossa equipe
      </CTAButton>
    </div>
  )
}
