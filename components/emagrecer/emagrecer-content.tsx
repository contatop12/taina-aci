"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Philosophy } from "@/components/philosophy"
import { defaultDifferentials, Differentials } from "@/components/differentials"
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

const EMAGRECER_DIFFERENTIALS = defaultDifferentials.map((item) =>
  item.title === "Consulta Médica + Nutricional Integrada"
    ? {
        ...item,
        description: [
          "Cuidar da saúde de forma completa significa olhar para diferentes aspectos do seu bem-estar de maneira integrada.",
          "No programa de acompanhamento da Dra. Tainã, você conta com atendimento conjunto em endocrinologia e nutrição, sem a necessidade de consultas separadas. Essa abordagem favorece um cuidado mais coordenado, com estratégias alinhadas e acompanhamento contínuo.",
          "O tratamento une a avaliação endocrinológica ao planejamento alimentar, sempre considerando sua rotina, seus objetivos e suas necessidades individuais.",
          "Cada decisão é construída em parceria, para que você participe ativamente do seu processo de cuidado e alcance resultados consistentes e sustentáveis.",
        ],
      }
    : item
)

const EMAGRECER_ABOUT_PARAGRAPHS = [
  "Minha trajetória na medicina é guiada pelo compromisso com um cuidado humano, ético e fundamentado em evidências.",
  "Após a formação em Clínica Médica, encontrei na endocrinologia minha verdadeira realização profissional. Ao longo dos anos, pacientes, alunos e colegas têm acompanhado essa dedicação à prática clínica e ao ensino.",
  "Além do atendimento em consultório, atuo na formação de médicos, com experiência no ensino de endocrinologia na graduação, na pós-graduação e na mentoria de profissionais. A vivência acadêmica contribui para uma atualização constante e para a integração entre conhecimento científico e prática clínica.",
  "No contexto do emagrecimento, realizo uma avaliação clínica abrangente, com interpretação cuidadosa dos exames e acompanhamento metabólico individualizado. O objetivo é identificar fatores hormonais, metabólicos e comportamentais que possam influenciar a saúde e a composição corporal, permitindo a construção de um plano terapêutico adequado para cada pessoa.",
]

export function EmagrecerContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={openModal} />
      <EmagrecerHero onOpenModal={openModal} />
      <Testimonials />
      <EmagrecerPain onOpenModal={openModal} />
      <EmagrecerHelp />
      <EmagrecerForWho />
      <Philosophy />
      <EmagrecerIndividual />
      <EmagrecerEducational />
      <EmagrecerMedication />
      <Differentials items={EMAGRECER_DIFFERENTIALS} />
      <About onOpenModal={openModal} paragraphs={EMAGRECER_ABOUT_PARAGRAPHS} />
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
