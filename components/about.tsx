"use client"

import Image from "next/image"
import { CTAButton } from "@/components/ui/cta-button"
import { FOTO_TAINA_2 } from "@/lib/media"
import { Check } from "lucide-react"

interface AboutProps {
  onOpenModal: () => void
  extraParagraph?: string
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

export function About({ onOpenModal, extraParagraph }: AboutProps) {
  return (
    <section id="sobre" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1" data-gsap-reveal>
            <Image
              src={FOTO_TAINA_2}
              alt="Dra. Tainã Aci"
              width={500}
              height={650}
              className="rounded-2xl shadow-xl object-cover w-full max-w-md mx-auto lg:mx-0"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div data-gsap-reveal>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
                Sobre a Dra. Tainã Aci
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
                Experiência clínica aliada à formação acadêmica
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Cuidado médico com rigor científico e atenção individual
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed" data-gsap-reveal>
              <p>
                Pacientes, alunos e amigos são testemunhas da minha paixão pela medicina. Após formação em Clínica Médica, encontrei na endocrinologia minha verdadeira realização profissional.
              </p>
              <p>
                Além do atendimento clínico, atuo na formação de médicos, com experiência no ensino de endocrinologia em nível de graduação e pós-graduação, e na mentoria de colegas. A vivência acadêmica contribui para atualização constante e integração entre evidência científica e prática clínica.
              </p>
              {extraParagraph && <p>{extraParagraph}</p>}
            </div>

            <div className="space-y-3">
              {credentials.map((credential) => (
                <div key={credential} className="flex items-start gap-3" data-gsap-card>
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{credential}</span>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-foreground" data-gsap-reveal>
              CRM: 166519 | RQE: 81061
            </p>

            <div data-gsap-reveal>
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
