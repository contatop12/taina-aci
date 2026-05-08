import type { Metadata } from "next"
import { DesqualificacaoContent } from "@/components/desqualificacao-content"

export const metadata: Metadata = {
  title: "Consulta particular | Dra. Tainã Aci",
  description:
    "Entenda por que o atendimento é exclusivamente particular e como isso pode ser a melhor escolha para a sua saúde.",
}

export default function DesqPage() {
  return <DesqualificacaoContent />
}
