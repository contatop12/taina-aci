"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"

interface HeaderProps {
  onOpenModal: () => void
}

export function Header({ onOpenModal }: HeaderProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] md:h-[80px] transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4 lg:px-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-taina-aci-endocrinologista-EbAIwBI2XjhD3n9QlAL4BKoBmVz2qC.png"
          alt="Dra. Tainã Aci - Endocrinologia e Metabologia Nutrologia"
          width={280}
          height={70}
          className="h-14 md:h-16 w-auto"
          priority
        />
        <CTAButton onClick={onOpenModal}>
          Fale com nossa equipe
        </CTAButton>
      </div>
    </header>
  )
}
