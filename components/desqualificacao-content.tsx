"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTAButton } from "@/components/ui/cta-button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const WHATSAPP_NUMBER = "5511951515103"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Gostaria de falar com a equipe sobre a consulta particular."
)

const reasons = [
  {
    n: "01",
    title: "Consulta com profundidade real",
    body:
      "Cada paciente é avaliado de forma individual, levando em conta exames, metabolismo, perfil hormonal, rotina, histórico de saúde e objetivos. Aqui, você não é tratado como mais um caso.",
  },
  {
    n: "02",
    title: "Medicina baseada em evidências",
    body:
      "Após 14 anos de formação, com duas residências médicas, mestrado profissional e atuação acadêmica, a Dra. Tainã conduz cada decisão clínica com base em evidências robustas — não em modismos ou condutas genéricas.",
  },
  {
    n: "03",
    title: "Consulta médica + nutricional integrada",
    body:
      "Em vez de consultas desconectadas com diferentes profissionais, o paciente recebe uma condução mais alinhada, prática e eficiente — com otimização do tratamento endocrinológico e ajuste alimentar em conjunto.",
  },
  {
    n: "04",
    title: "Exames e tecnologias avançadas",
    body:
      "Quando indicado, a avaliação pode incluir teste genético, scanner corporal e bioimpedância — recursos que permitem uma leitura mais precisa do metabolismo e um plano mais assertivo.",
  },
  {
    n: "05",
    title: "Acompanhamento focado em resultado sustentável",
    body:
      "O objetivo não é apenas perder peso ou controlar um exame por algumas semanas. O foco é construir uma estratégia que faça sentido para a sua realidade e favoreça resultados consistentes ao longo do tempo.",
  },
]

const costItems = [
  "Tentativas frustradas de emagrecimento",
  "Efeito sanfona e reganho de peso",
  "Condutas genéricas que não respeitam o seu metabolismo",
  "Sintomas persistentes sem investigação aprofundada",
  "Sensação de que ninguém olha o seu caso como deveria",
  "Perda de tempo com abordagens superficiais",
]

const idealFor = [
  "Busca emagrecimento com embasamento científico",
  "Quer investigar melhor hormônios, metabolismo e composição corporal",
  "Não quer uma consulta apressada e genérica",
  "Valoriza profundidade, personalização e acompanhamento próximo",
  "Entende que cuidar da saúde com qualidade é um investimento importante",
]

const credentials = [
  "Residência em Clínica Médica — Hospital do Servidor Público Municipal de SP",
  "Residência em Endocrinologia — Hospital Santa Marcelina",
  "Mestrado profissional em Inovação no ensino superior em saúde — USCS",
  "Especialista pela Sociedade Brasileira de Endocrinologia (SBEM)",
  "Membro da Endocrine Society (EUA)",
  "Pós-graduada em Nutrologia — ABRAN",
  "Fellow Research — McGill University, Canadá",
  "CRM: 166519 | RQE: 81061",
]

const faqs = [
  {
    q: "A Dra. Tainã atende convênio ou plano de saúde?",
    a:
      "Não. O atendimento é exclusivamente particular, para que a consulta e o acompanhamento tenham o tempo, a profundidade e a personalização necessários para gerar resultados reais.",
  },
  {
    q: "Por que o atendimento é particular?",
    a:
      "Porque esse modelo permite uma medicina mais cuidadosa, individualizada, com estratégia personalizada, integração clínica e nutricional e possibilidade de exames avançados quando indicados. Saúde de qualidade não cabe em 10 minutos.",
  },
  {
    q: "O atendimento é só para quem quer emagrecer?",
    a:
      "Não. A Dra. Tainã também atua em casos de menopausa, hormônios masculinos, pós-bariátrica, gestação, diabetes, tireoide, prevenção e saúde metabólica.",
  },
  {
    q: "A consulta pode ser online?",
    a: "Sim. Há atendimento presencial na Vila Mariana e atendimento online para Brasil e exterior.",
  },
  {
    q: "Vale a pena para quem estava buscando convênio?",
    a:
      "Se você busca uma solução mais profunda, personalizada e com acompanhamento próximo, pode valer muito a pena conhecer como funciona o modelo particular antes de decidir. A equipe pode te explicar tudo pelo WhatsApp, sem compromisso.",
  },
]

export function DesqualificacaoContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}`,
      "_blank"
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <article className="pt-[90px] md:pt-[100px] pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="mb-8">
            <Link
              href="/"
              className="text-sm text-primary font-medium hover:underline underline-offset-4"
            >
              ← Voltar ao início
            </Link>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Consulta particular
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground leading-tight text-balance mb-6">
            Entenda por que o atendimento da Dra. Tainã é exclusivamente particular — e por que isso pode
            ser a melhor escolha para a sua saúde.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Se você chegou até aqui buscando convênio, essa dúvida é totalmente compreensível. Mas, quando o
            assunto é emagrecimento, hormônios e saúde metabólica, a forma como o cuidado é conduzido faz
            toda a diferença no resultado.
          </p>

          <section className="space-y-4 mb-12">
            <h2 className="text-xl font-serif text-foreground">Saúde de qualidade não cabe em 10 minutos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Em muitos atendimentos por convênio, o tempo é curto e a consulta acaba sendo limitada ao
              básico. Quando falamos de obesidade, menopausa, deficiência hormonal, diabetes, tireoide e
              saúde metabólica, isso normalmente não é suficiente.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Bons resultados exigem escuta verdadeira, análise individual do histórico, avaliação clínica
              cuidadosa, estratégia personalizada e acompanhamento próximo para evitar frustrações e efeito
              sanfona. Foi por isso que a Dra. Tainã optou por um modelo de atendimento exclusivamente
              particular: para oferecer um cuidado mais completo, humano e tecnicamente mais preciso.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif text-foreground mb-6">
              Por que tantas pessoas escolhem investir no atendimento particular da Dra. Tainã
            </h2>
            <ul className="space-y-8">
              {reasons.map((item) => (
                <li key={item.n} className="border-l-2 border-primary/30 pl-5">
                  <p className="text-sm font-semibold text-primary mb-1">{item.n}</p>
                  <p className="font-medium text-foreground mb-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12 space-y-4">
            <h2 className="text-xl font-serif text-foreground">
              O custo de continuar sem um acompanhamento realmente adequado
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Muitas pessoas chegam pensando apenas no custo imediato. Mas vale considerar o que acontece
              quando o acompanhamento não tem a profundidade necessária:
            </p>
            <ul className="list-disc ps-5 space-y-2 text-muted-foreground">
              {costItems.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Quando o cuidado é mais completo, a experiência muda. Você entende melhor o seu corpo, recebe
              uma estratégia personalizada e passa a ser acompanhado com mais critério e clareza.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-serif text-foreground mb-4">Para quem esse modelo faz sentido</h2>
            <p className="text-muted-foreground mb-4">O atendimento da Dra. Tainã é ideal para quem:</p>
            <ul className="list-disc ps-5 space-y-2 text-muted-foreground">
              {idealFor.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12 rounded-2xl bg-muted/50 p-6 md:p-8">
            <h2 className="text-xl font-serif text-foreground mb-2">
              Formação e experiência da Dra. Tainã Aci
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Experiência clínica aliada à formação acadêmica para um atendimento técnico, cuidadoso e
              individualizado.
            </p>
            <ul className="space-y-3">
              {credentials.map((line) => (
                <li key={line} className="flex gap-2 text-sm text-foreground leading-snug">
                  <span className="text-primary shrink-0">—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-center mb-8">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${index}`}
                  className="bg-card rounded-xl px-4 border border-border/60 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-5">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="text-center space-y-6 pb-8 border-t border-border pt-12">
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              A agenda da Dra. Tainã é reduzida justamente para preservar a qualidade do acompanhamento. Se
              fizer sentido para você, a equipe pode te explicar como funciona a consulta particular pelo
              WhatsApp.
            </p>
            <CTAButton onClick={openWhatsapp} size="lg" className="max-w-full">
              Quero falar com a equipe sobre a consulta particular
            </CTAButton>
          </section>
        </div>
      </article>

      <Footer />
      <WhatsAppButton onOpenModal={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
