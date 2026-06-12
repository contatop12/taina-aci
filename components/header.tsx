"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { LOGO_PRINCIPAL } from "@/lib/media"
import { CTAButton } from "@/components/ui/cta-button"

interface HeaderProps {
  onOpenModal: () => void
  whatsappDirect?: boolean
}

export function Header({ onOpenModal, whatsappDirect = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] md:h-[80px] transition-all duration-300 bg-white/95 backdrop-blur-sm md:shadow-none ${
        isScrolled ? "shadow-sm md:bg-white/95" : "shadow-sm md:bg-transparent md:shadow-none"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          aria-label="Ir para a página inicial"
          className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Image
            src={LOGO_PRINCIPAL}
            alt="Dra. Tainã Aci - Endocrinologia e Metabologia Nutrologia"
            width={280}
            height={70}
            className="h-12 md:h-16 w-auto"
            priority
          />
        </Link>
        <CTAButton onClick={onOpenModal} size="sm" className="md:hidden">
          {whatsappDirect ? "WhatsApp" : "Fale com a equipe"}
        </CTAButton>
        <CTAButton onClick={onOpenModal} className="hidden md:inline-flex">
          {whatsappDirect ? "Falar pelo WhatsApp" : "Fale com nossa equipe"}
        </CTAButton>
      </div>
    </header>
  )
}
