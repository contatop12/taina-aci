"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { DIFFERENCIAL_IMAGES } from "@/lib/media"

export type DifferentialItem = {
  title: string
  description: string | string[]
  image: string
}

const defaultDifferentials: DifferentialItem[] = [
  {
    title: "Medicina Baseada em Evidência",
    description:
      "Após 14 anos de formação, com duas residências médicas, dois registros de qualificação de especialista e mestrado profissional, a Dra. Tainã leva a sério o tratamento com embasamento científico correto. Cada decisão clínica é fundamentada em evidências robustas, associada a uma escuta ativa para identificar o que realmente funciona para a realidade de cada paciente.",
    image: DIFFERENCIAL_IMAGES.medicina,
  },
  {
    title: "Consulta Médica + Nutricional Integrada",
    description:
      "No programa de acompanhamento da Dra. Tainã — com resultados altamente positivos comprovados no consultório — você não precisa agendar uma consulta com endocrinologista e outra com nutricionista separadamente. O atendimento é realizado em conjunto: otimização do tratamento endocrinológico e ajustes da estratégia alimentar, com o paciente participando ativamente de cada decisão.",
    image: DIFFERENCIAL_IMAGES.consulta,
  },
  {
    title: "Exames Avançados: Teste Genético, Scanner Corporal e Bioimpedância",
    description:
      "Avaliação completa do seu metabolismo com teste genético, scanner corporal e bioimpedância, usando tecnologia de ponta para um diagnóstico mais preciso e um plano mais eficaz.",
    image: DIFFERENCIAL_IMAGES.exames,
  },
  {
    title: "Quando indicado: tratamento medicamentoso acompanhado",
    description:
      "Avanços recentes trouxeram opções eficazes para o tratamento da obesidade e do diabetes, com benefícios no peso e no controle metabólico. A escolha da medicação deve ser criteriosa e personalizada. O acompanhamento profissional permite ajustes precisos para otimizar os resultados e a sua manutenção a longo prazo.",
    image: DIFFERENCIAL_IMAGES.medicamento,
  },
]

interface DifferentialsProps {
  items?: DifferentialItem[]
}

function DifferentialDescription({ description }: { description: string | string[] }) {
  const paragraphs = Array.isArray(description) ? description : [description]

  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  )
}

export function Differentials({ items = defaultDifferentials }: DifferentialsProps) {
  return (
    <section id="diferenciais" className="overflow-hidden bg-background py-12 md:py-24 lg:py-32">
      <div className="container mx-auto mb-12 px-4 md:mb-16 lg:px-8">
        <div className="text-center" data-gsap-reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Diferenciais
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl text-balance md:text-4xl lg:text-5xl">
            Um modelo de consulta que você não encontra no convencional
          </h2>
        </div>
      </div>

      <div className="flex flex-col">
        {items.map((item, index) => {
          const imageFirst = index % 2 === 1

          return (
            <div
              key={item.title}
              data-gsap-differential={imageFirst ? "reversed" : "normal"}
              className="grid min-h-[420px] grid-cols-1 lg:min-h-[480px] lg:grid-cols-2"
            >
              <div
                data-gsap-diff-text
                className={cn(
                  "flex items-center bg-muted px-8 py-12 lg:px-16 lg:py-20",
                  imageFirst ? "order-2 lg:order-2" : "order-2 lg:order-1"
                )}
              >
                <div className="mx-auto w-full max-w-xl">
                  <h3 className="mb-5 font-serif text-2xl leading-snug text-balance text-foreground md:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                  <DifferentialDescription description={item.description} />
                </div>
              </div>

              <div
                data-gsap-diff-image
                className={cn(
                  "relative min-h-[280px] lg:min-h-full",
                  imageFirst ? "order-1 lg:order-1" : "order-1 lg:order-2"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export { defaultDifferentials }
