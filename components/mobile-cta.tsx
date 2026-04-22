"use client"

import { Button } from "@/components/ui/button"

interface MobileCTAProps {
  onOpenModal: () => void
}

export function MobileCTA({ onOpenModal }: MobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-white/95 backdrop-blur-sm border-t border-border md:hidden">
      <Button
        onClick={onOpenModal}
        className="w-full bg-[#AABB6A] hover:bg-[#9AAB5A] text-white font-medium py-6"
      >
        Agendar Consulta
      </Button>
    </div>
  )
}
