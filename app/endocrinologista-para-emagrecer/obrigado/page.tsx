import type { Metadata } from "next"
import { ObrigadoContent } from "@/components/obrigado-content"
import { EMAGRECER_FLOW } from "@/lib/form-flows"
import { SITE_BASE_URL } from "@/lib/tracking"

const PAGE_URL = `${SITE_BASE_URL}${EMAGRECER_FLOW.obrigadoPath}`

export const metadata: Metadata = {
  title: "Obrigado | Endocrinologista para Emagrecer | Dra. Tainã Aci",
  description: "Recebemos sua solicitação de contato para avaliação endocrinológica.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: { index: false, follow: true },
}

export default function EmagrecerObrigadoPage() {
  return <ObrigadoContent flow={EMAGRECER_FLOW} />
}
