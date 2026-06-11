import { SITE_BASE_URL } from "@/lib/tracking"

export interface FormFlow {
  formId: string
  obrigadoPath: string
  porQueParticularPath: string
  homePath: string
  homeUrl: string
}

export const VILA_MARIANA_FLOW: FormFlow = {
  formId: "taina_vila_mariana_sp",
  obrigadoPath: "/obrigado",
  porQueParticularPath: "/por-que-particular",
  homePath: "/vila-mariana-sp",
  homeUrl: `${SITE_BASE_URL}/vila-mariana-sp`,
}

export const EMAGRECER_FLOW: FormFlow = {
  formId: "taina_endocrino_emagrecer",
  obrigadoPath: "/endocrinologista-para-emagrecer/obrigado",
  porQueParticularPath: "/endocrinologista-para-emagrecer/por-que-particular",
  homePath: "/endocrinologista-para-emagrecer",
  homeUrl: `${SITE_BASE_URL}/endocrinologista-para-emagrecer`,
}

export function getFormFlow(formId: string): FormFlow {
  if (formId === EMAGRECER_FLOW.formId) return EMAGRECER_FLOW
  return VILA_MARIANA_FLOW
}
