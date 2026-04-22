"use client"

import { useState, useEffect } from "react"
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
import { MobileCTA } from "@/components/mobile-cta"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Philosophy />
      <Treatments onOpenModal={() => setIsModalOpen(true)} />
      <Differentials />
      <Testimonials />
      <About onOpenModal={() => setIsModalOpen(true)} />
      <WhyPrivate />
      <GoogleReviews />
      <Location onOpenModal={() => setIsModalOpen(true)} />
      <FAQ />
      <FinalCTA onOpenModal={() => setIsModalOpen(true)} />
      <Footer />
      <WhatsAppButton onOpenModal={() => setIsModalOpen(true)} />
      <MobileCTA onOpenModal={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
