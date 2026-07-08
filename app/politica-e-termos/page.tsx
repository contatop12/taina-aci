import type { Metadata } from "next"
import { LegalPageContent } from "@/components/legal-page-content"
import { SITE_BASE_URL } from "@/lib/tracking"
import { LEGAL_PAGE_PATH } from "@/lib/legal-content"

export const metadata: Metadata = {
  title: "Política de Privacidade e Termos de Uso | Dra. Tainã Aci",
  description:
    "Política de Privacidade e Termos de Uso do site da Dra. Tainã Aci. Saiba como seus dados são tratados e as condições de uso do site.",
  alternates: {
    canonical: `${SITE_BASE_URL}${LEGAL_PAGE_PATH}`,
  },
  openGraph: {
    title: "Política de Privacidade e Termos de Uso | Dra. Tainã Aci",
    description:
      "Política de Privacidade e Termos de Uso do site da Dra. Tainã Aci, em conformidade com a LGPD.",
    url: `${SITE_BASE_URL}${LEGAL_PAGE_PATH}`,
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PoliticaETermosPage() {
  return <LegalPageContent />
}
