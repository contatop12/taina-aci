"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "A Dra. Tainã Aci atende por convênio ou plano de saúde?",
    answer:
      "O atendimento é exclusivamente particular. Essa escolha garante tempo adequado de consulta, abordagem personalizada e acesso ao que há de mais moderno em medicina de precisão.",
  },
  {
    question: "Por que escolher a Dra. Tainã em vez de outros profissionais?",
    answer:
      "Construir um vínculo de confiança com o médico é parte fundamental para o sucesso do tratamento. A condução da Dra Tainã integra experiência clínica, formação sólida, atuação acadêmica e um modelo de cuidado que inclui acompanhamento nutricional integrado e foco em resultados sustentáveis e seguros.",
  },
  {
    question: "Os tratamentos são só para quem já tem algum problema de saúde?",
    answer:
      "Não. O acompanhamento endocrinológico é indicado tanto para o tratamento de condições já estabelecidas quanto para a prevenção, com foco na detecção precoce de alterações metabólicas e na redução de riscos ao longo do tempo.",
  },
  {
    question: "Por que qualquer pessoa acima dos 30 anos deveria consultar um endocrinologista?",
    answer:
      "A partir dos 30 anos, o corpo passa por mudanças hormonais e metabólicas importantes. O acompanhamento especializado permite identificar desequilíbrios precocemente, preservar energia, vitalidade e qualidade de vida.",
  },
  {
    question: "A Dra. prescreve caneta emagrecedora?",
    answer:
      "Quando clinicamente indicado, sim. O uso é sempre individualizado, seguro e acompanhado de perto — nunca como solução isolada.",
  },
  {
    question: "É possível fazer a consulta online?",
    answer:
      "Sim. A Dra. Tainã realiza atendimentos via telemedicina para pacientes em todo o Brasil e no exterior, incluindo Portugal, Estados Unidos e Japão.",
  },
  {
    question: "Como funciona a consulta com nutricionista incluída?",
    answer:
      "Após a avaliação inicial, é possível optar por um programa de acompanhamento clínico que integra o atendimento médico e nutricional. Nessa modalidade, as consultas são realizadas de forma conjunta, a partir de uma metodologia própria, desenvolvida pela Dra Tainã para promover maior alinhamento entre as condutas e resultados mais consistentes.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "O tempo de resposta varia conforme cada caso. Em geral, já é possível observar mudanças iniciais nas primeiras semanas após o início do acompanhamento. O foco, no entanto, é a construção de resultados consistentes e sustentáveis ao longo do tempo.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-12" data-gsap-reveal>
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Dúvidas Frequentes
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-balance">
            Perguntas que nossos pacientes costumam fazer
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              data-gsap-card
              className="bg-background rounded-xl px-6 border-none shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
