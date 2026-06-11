import type { Metadata } from "next"
import { PorQueParticularContent } from "@/components/por-que-particular-content"
import { EMAGRECER_FLOW } from "@/lib/form-flows"
import { SITE_BASE_URL } from "@/lib/tracking"

const PAGE_URL = `${SITE_BASE_URL}${EMAGRECER_FLOW.porQueParticularPath}`

export const metadata: Metadata = {
  title: "Por que consulta particular | Endocrinologista para Emagrecer | Dra. Tainã Aci",
  description:
    "Entenda a diferença do atendimento particular com a Dra. Tainã para emagrecimento, metabolismo e saúde hormonal.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Por que consulta particular | Endocrinologista para Emagrecer | Dra. Tainã Aci",
    description:
      "Tempo real, estratégia personalizada e acompanhamento contínuo em endocrinologia para emagrecimento na Vila Mariana.",
    url: PAGE_URL,
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: false, follow: true },
}

export default function EmagrecerPorQueParticularPage() {
  return <PorQueParticularContent flow={EMAGRECER_FLOW} />
}
