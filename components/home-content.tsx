"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { Treatments } from "@/components/treatments"
import { Differentials } from "@/components/differentials"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { WhyPrivate } from "@/components/why-private"
import { GoogleReviews } from "@/components/google-reviews"
import { Location } from "@/components/location"
import { FAQ } from "@/components/faq"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useHomeCta, type HomeContentVariant } from "@/hooks/use-home-cta"

interface HomeContentProps {
  variant?: HomeContentVariant
}

export function HomeContent({ variant = "form" }: HomeContentProps) {
  const { isModalOpen, setIsModalOpen, onCtaClick, showModal } = useHomeCta(variant)
  const isWhatsApp = variant === "whatsapp"

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={onCtaClick} whatsappDirect={isWhatsApp} />
      <Hero onOpenModal={onCtaClick} whatsappDirect={isWhatsApp} />
      <Philosophy />
      <Treatments onOpenModal={onCtaClick} />
      <Differentials />
      <Testimonials />
      <About onOpenModal={onCtaClick} />
      <WhyPrivate />
      <GoogleReviews />
      <Location
        onOpenModal={onCtaClick}
        ctaLabel={isWhatsApp ? "Falar pelo WhatsApp" : undefined}
      />
      <FAQ />
      <FinalCTA onOpenModal={onCtaClick} whatsappDirect={isWhatsApp} />
      <Footer />
      <WhatsAppButton onOpenModal={onCtaClick} />
      {showModal && (
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  )
}
