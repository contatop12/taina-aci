import type { Metadata } from "next"
import { EmagrecerContent } from "@/components/emagrecer/emagrecer-content"
import { emagrecerFaqs } from "@/components/emagrecer/faq-data"

const PAGE_URL = "https://endocrinologista.tainaaci.com.br/endocrinologista-para-emagrecer"

export const metadata: Metadata = {
  title: "Endocrinologista para Emagrecer em São Paulo | Dra. Tainã Aci",
  description:
    "Consulta particular com endocrinologista para emagrecimento, obesidade, resistência à insulina e metabolismo. Avaliação individualizada na Vila Mariana, SP.",
  keywords:
    "endocrinologista para emagrecer, endocrinologista emagrecer, endócrino para emagrecimento, médico para emagrecimento, endocrinologista perda de peso, endocrinologista para emagrecer sp, tratamento endocrino para emagrecer, emagrecer com endocrinologista",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Endocrinologista para Emagrecer em São Paulo | Dra. Tainã Aci",
    description:
      "Consulta particular com endocrinologista para emagrecimento, obesidade, resistência à insulina e metabolismo. Avaliação individualizada na Vila Mariana, SP.",
    url: PAGE_URL,
    locale: "pt_BR",
    type: "website",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: emagrecerFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dra. Tainã Aci",
  medicalSpecialty: "Endocrinology",
  description:
    "Endocrinologista para emagrecimento, obesidade, resistência à insulina e saúde metabólica. Consultas particulares na Vila Mariana, São Paulo.",
  url: PAGE_URL,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Domingos de Morais, 2187, CJ 406 - Torre Paris",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "04035-000",
    addressCountry: "BR",
  },
  areaServed: "São Paulo",
  telephone: "+55-11-95151-5103",
}

export default function EndocrinologistaParaEmagrecer() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
      <EmagrecerContent />
    </>
  )
}
