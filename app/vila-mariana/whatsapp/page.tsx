import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"
import { SITE_BASE_URL } from "@/lib/tracking"

const PAGE_PATH = "/vila-mariana/whatsapp"
const PAGE_URL = `${SITE_BASE_URL}${PAGE_PATH}`

export const metadata: Metadata = {
  title: "Endocrinologista na Vila Mariana SP | WhatsApp | Dra. Tainã Aci",
  description:
    "Fale direto pelo WhatsApp com a equipe da Dra. Tainã Aci. Endocrinologista na Vila Mariana, SP — emagrecimento, hormônios, tireoide e saúde metabólica.",
  keywords:
    "endocrinologista Vila Mariana, endocrinologista Vila Mariana SP, endocrinologista São Paulo, emagrecimento, hormônios, tireoide, whatsapp",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Endocrinologista na Vila Mariana SP | WhatsApp | Dra. Tainã Aci",
    description:
      "Fale direto pelo WhatsApp com a equipe da Dra. Tainã Aci. Consultas particulares em endocrinologia na Vila Mariana, SP.",
    url: PAGE_URL,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function VilaMarianaWhatsApp() {
  return <HomeContent variant="whatsapp" />
}
