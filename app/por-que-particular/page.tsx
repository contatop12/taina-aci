import type { Metadata } from "next"
import { PorQueParticularContent } from "@/components/por-que-particular-content"

export const metadata: Metadata = {
  title: "Por que consulta particular | Dra. Tainã Aci",
  description:
    "Entenda a diferença do atendimento particular com a Dra. Tainã, tempo de consulta, integração com nutrição e o que esperar na prática.",
  alternates: {
    canonical: "https://endocrinologista.tainaaci.com.br/por-que-particular",
  },
  openGraph: {
    title: "Por que consulta particular | Dra. Tainã Aci",
    description:
      "Tempo real, estratégia personalizada e acompanhamento contínuo em endocrinologia na Vila Mariana.",
    url: "https://endocrinologista.tainaaci.com.br/por-que-particular",
    locale: "pt_BR",
    type: "website",
  },
}

export default function PorQueParticularPage() {
  return <PorQueParticularContent />
}
