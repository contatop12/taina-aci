"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Differentials } from "@/components/differentials"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { WhyPrivate } from "@/components/why-private"
import { GoogleReviews } from "@/components/google-reviews"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { EmagrecerHero } from "./emagrecer-hero"
import { EmagrecerPain } from "./emagrecer-pain"
import { EmagrecerHelp } from "./emagrecer-help"
import { EmagrecerForWho } from "./emagrecer-for-who"
import { EmagrecerIndividual } from "./emagrecer-individual"
import { EmagrecerEducational } from "./emagrecer-educational"
import { EmagrecerMedication } from "./emagrecer-medication"
import { EmagrecerFAQ } from "./emagrecer-faq"
import { EmagrecerFinalCTA } from "./emagrecer-final-cta"

const EMAGRECER_OBJECTIVES = [
  "Emagrecimento / Metabolismo",
  "Tireoide",
  "Diabetes / Resistência à Insulina",
  "Endocrinologia Geral",
  "Outro",
]

export function EmagrecerContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <EmagrecerHero onOpenModal={openModal} />
      <EmagrecerPain onOpenModal={openModal} />
      <EmagrecerHelp />
      <EmagrecerForWho />
      <EmagrecerIndividual />
      <EmagrecerEducational />
      <EmagrecerMedication />
      <Differentials />
      <About
        onOpenModal={openModal}
        extraParagraph="No contexto do emagrecimento, a Dra. Tainã Aci realiza avaliação clínica completa, interpretação de exames e acompanhamento metabólico individualizado, com foco em causas hormonais e metabólicas que podem dificultar a perda de peso."
      />
      <Testimonials />
      <WhyPrivate />
      <GoogleReviews />
      <Location
        onOpenModal={openModal}
        reinforcement="Atendimento particular com endocrinologista na Vila Mariana, em São Paulo. Consultas presenciais, com horários disponíveis para agendamento."
        ctaLabel="Agendar consulta"
      />
      <EmagrecerFAQ />
      <EmagrecerFinalCTA onOpenModal={openModal} />
      <Footer />
      <WhatsAppButton onOpenModal={openModal} />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        objectives={EMAGRECER_OBJECTIVES}
        subtitle="Nossa equipe entra em contato pelo WhatsApp para agendar sua avaliação endocrinológica."
        submitLabel="Quero agendar minha avaliação"
        formId="taina_endocrino_emagrecer"
      />
    </main>
  )
}
