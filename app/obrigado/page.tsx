import type { Metadata } from "next"
import { ObrigadoContent } from "@/components/obrigado-content"

export const metadata: Metadata = {
  title: "Obrigado | Dra. Tainã Aci",
  description: "Recebemos sua solicitação de contato.",
  robots: { index: false, follow: true },
}

export default function ObrigadoPage() {
  return <ObrigadoContent />
}
