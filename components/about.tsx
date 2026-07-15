"use client"

import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"
import { FOTO_TAINA_2 } from "@/lib/media"
import { Check } from "lucide-react"

interface AboutProps {
  onOpenModal: () => void
  extraParagraph?: string
  paragraphs?: string[]
}

const credentials = [
  "Residência em Clínica Médica — Hospital do Servidor Público Municipal de SP - RQE 81060",
  "Residência em Endocrinologia — Hospital Santa Marcelina - RQE 81061",
  "Mestrado profissional Inovação no ensino superior em saúde - USCS",
  "Especialista pela Sociedade Brasileira de Endocrinologia (SBEM)",
  "Membro da Endocrine Society (EUA)",
  "Pós-graduada em Nutrologia — ABRAN",
  "Fellow Research — McGill University, Canadá",
]

const defaultParagraphs = [
  "Pacientes, alunos e amigos são testemunhas da minha paixão pela medicina. Após formação em Clínica Médica, encontrei na endocrinologia minha verdadeira realização profissional.",
  "Além do atendimento clínico, atuo na formação de médicos, com experiência no ensino de endocrinologia em nível de graduação e pós-graduação, e na mentoria de colegas. A vivência acadêmica contribui para atualização constante e integração entre evidência científica e prática clínica.",
]

export function About({ onOpenModal, extraParagraph, paragraphs }: AboutProps) {
  const bodyParagraphs = paragraphs ?? [
    ...defaultParagraphs,
    ...(extraParagraph ? [extraParagraph] : []),
  ]

  return (
    <section id="sobre" className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div
            className="order-2 lg:order-1 lg:col-span-5 lg:sticky lg:top-28"
            data-gsap-reveal
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-lg overflow-hidden rounded-2xl shadow-xl lg:max-w-none">
              <Image
                src={FOTO_TAINA_2}
                alt="Dra. Tainã Aci"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 90vw, 42vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 space-y-6">
            <div data-gsap-reveal>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
                Sobre a Dra. Tainã Aci
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-4 text-balance">
                Experiência clínica aliada à formação acadêmica
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Cuidado médico com rigor científico e atenção individual
              </p>
            </div>

            <div className="space-y-3.5 text-muted-foreground leading-relaxed" data-gsap-reveal>
              {bodyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-3" data-gsap-card>
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm leading-snug text-foreground">{credential}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between" data-gsap-reveal>
              <p className="text-sm font-medium text-foreground">
                CRM: 166519 | RQE: 81061
              </p>
              <CTAButton onClick={onOpenModal}>
                Fale com nossa equipe
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
