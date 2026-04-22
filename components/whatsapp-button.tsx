"use client"

import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  onOpenModal: () => void
}

export function WhatsAppButton({ onOpenModal }: WhatsAppButtonProps) {
  return (
    <button
      onClick={onOpenModal}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 animate-pulse hover:animate-none md:bottom-8 md:right-8"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </button>
  )
}
