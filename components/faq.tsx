"use client"

import { useEffect, useRef, useState } from "react"
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
      "Não. O atendimento é exclusivamente particular. Essa escolha garante tempo adequado de consulta, abordagem personalizada e acesso ao que há de mais moderno em medicina de precisão.",
  },
  {
    question: "Por que escolher a Dra. Tainã em vez de outros profissionais?",
    answer:
      "Pela combinação única de experiência clínica, formação internacional, atuação acadêmica e um modelo de consulta que inclui nutricionista integrada — tudo focado em resultados consistentes e seguros.",
  },
  {
    question: "Os tratamentos são só para quem já tem algum problema de saúde?",
    answer:
      "Não. Muitos pacientes buscam prevenção, performance e otimização da saúde. O acompanhamento é indicado tanto para quem já tem sintomas quanto para quem quer se antecipar a desequilíbrios futuros.",
  },
  {
    question: "Por que qualquer pessoa acima dos 30 anos deveria consultar um endocrinologista?",
    answer:
      "A partir dos 30 anos, o corpo passa por mudanças hormonais e metabólicas importantes. O acompanhamento especializado permite identificar desequilíbrios precocemente, preservar energia, vitalidade e qualidade de vida.",
  },
  {
    question: "A Dra. prescreve Ozempic, Mounjaro ou Wegovy?",
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
      "Na mesma consulta, você é atendido pela Dra. Tainã e por uma nutricionista, de forma integrada. Isso otimiza seu tempo e potencializa os resultados do tratamento.",
  },
  {
    question: "Quanto tempo leva para ver resultados?",
    answer:
      "Varia conforme cada caso, mas muitos pacientes já percebem melhoras nas primeiras semanas com o plano adequado. O foco é sempre em resultados sustentáveis, não em soluções rápidas.",
  },
]

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-4xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-12">
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
              className="bg-card rounded-xl px-6 border-0 shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
