export const LEGAL_PAGE_PATH = "/politica-e-termos"
export const PRIVACY_SECTION_ID = "privacidade"
export const TERMS_SECTION_ID = "termos"
export const LEGAL_LAST_UPDATED = "8 de julho de 2026"

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  list?: string[]
}

export interface LegalDocument {
  id: string
  title: string
  intro: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalDocument = {
  id: PRIVACY_SECTION_ID,
  title: "Política de Privacidade",
  intro:
    "Esta Política de Privacidade descreve como a Dra. Tainã Aci trata dados pessoais no site endocrinologista.tainaaci.com.br, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
  sections: [
    {
      id: "controlador",
      title: "1. Quem é o responsável pelos dados",
      paragraphs: [
        "A responsável pelo tratamento dos dados pessoais coletados por meio deste site é Dra. Tainã Aci, médica endocrinologista, inscrita no CRM-SP sob o nº 166519 e RQE 81061, com consultório na Torre Paris — R. Domingos de Morais, 2187, CJ 405, Vila Mariana, São Paulo — SP, CEP 04035-000.",
        "Para dúvidas sobre privacidade e proteção de dados, entre em contato pelo telefone/WhatsApp (11) 95151-5103.",
      ],
    },
    {
      id: "dados-coletados",
      title: "2. Quais dados coletamos",
      paragraphs: ["Podemos coletar as seguintes categorias de dados, conforme sua interação com o site:"],
      list: [
        "Dados de identificação e contato: nome, e-mail, telefone/WhatsApp e objetivo do atendimento informados no formulário.",
        "Dados de navegação: endereço IP, páginas visitadas, data e hora de acesso, tipo de navegador e dispositivo.",
        "Dados de campanha: parâmetros de URL como utm_source, utm_medium, utm_campaign, gclid e fbclid, quando presentes.",
        "Dados de cookies e tecnologias semelhantes, conforme descrito nesta política.",
      ],
    },
    {
      id: "finalidades",
      title: "3. Para que usamos seus dados",
      paragraphs: ["Utilizamos os dados pessoais para as finalidades abaixo:"],
      list: [
        "Responder solicitações de contato e agendamento enviadas pelo formulário ou WhatsApp.",
        "Prestar informações sobre consultas, especialidades e atendimento da clínica.",
        "Medir desempenho de campanhas publicitárias e melhorar a experiência no site.",
        "Cumprir obrigações legais e regulatórias aplicáveis à atividade médica.",
        "Garantir segurança, prevenção a fraudes e funcionamento técnico do site.",
      ],
    },
    {
      id: "bases-legais",
      title: "4. Bases legais do tratamento",
      paragraphs: ["O tratamento de dados pessoais ocorre com fundamento nas hipóteses previstas na LGPD, incluindo:"],
      list: [
        "Consentimento do titular, quando você autoriza o uso dos dados no formulário de contato.",
        "Execução de procedimentos preliminares relacionados a contrato ou atendimento solicitado por você.",
        "Legítimo interesse, para análise de acesso ao site, segurança e melhoria dos serviços digitais, respeitados seus direitos.",
        "Cumprimento de obrigação legal ou regulatória, quando aplicável.",
      ],
    },
    {
      id: "cookies",
      title: "5. Cookies e ferramentas de análise",
      paragraphs: [
        "Utilizamos cookies e tecnologias similares para lembrar preferências, medir audiência e avaliar resultados de marketing. Entre as ferramentas utilizadas estão o Google Tag Manager, o Google Analytics (quando configurado no GTM) e o Meta Pixel (Facebook/Instagram).",
        "Você pode gerenciar cookies nas configurações do seu navegador. A recusa de alguns cookies pode limitar funcionalidades do site, mas não impede o contato por telefone ou WhatsApp.",
      ],
    },
    {
      id: "compartilhamento",
      title: "6. Compartilhamento de dados",
      paragraphs: [
        "Seus dados podem ser compartilhados apenas quando necessário, com:",
        "Não vendemos dados pessoais. Exigimos de parceiros o tratamento adequado e compatível com esta política.",
      ],
      list: [
        "Prestadores de serviço de hospedagem, automação e atendimento digital que apoiam a operação do site e do fluxo de leads.",
        "Plataformas de comunicação, como WhatsApp, para continuidade do atendimento solicitado por você.",
        "Ferramentas de análise e publicidade (Google, Meta e similares), conforme suas políticas próprias.",
        "Autoridades públicas, quando houver obrigação legal, ordem judicial ou requisição válida.",
      ],
    },
    {
      id: "retencao",
      title: "7. Retenção e segurança",
      paragraphs: [
        "Os dados são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política, respeitando prazos legais, regulatórios e de prescrição aplicáveis à área da saúde.",
        "Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acessos não autorizados, perda, alteração ou divulgação indevida.",
      ],
    },
    {
      id: "direitos",
      title: "8. Seus direitos como titular",
      paragraphs: [
        "Nos termos da LGPD, você pode solicitar:",
        "Para exercer seus direitos, entre em contato pelo WhatsApp (11) 95151-5103. Responderemos em prazo razoável, conforme a legislação vigente.",
      ],
      list: [
        "Confirmação da existência de tratamento e acesso aos dados.",
        "Correção de dados incompletos, inexatos ou desatualizados.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.",
        "Portabilidade, quando aplicável.",
        "Informação sobre compartilhamentos realizados.",
        "Revogação do consentimento, quando essa for a base do tratamento.",
      ],
    },
    {
      id: "alteracoes-privacidade",
      title: "9. Alterações desta política",
      paragraphs: [
        "Esta Política de Privacidade pode ser atualizada a qualquer momento para refletir mudanças legais, técnicas ou operacionais. A data da última atualização será indicada no topo desta página.",
      ],
    },
  ],
}

export const termsOfUse: LegalDocument = {
  id: TERMS_SECTION_ID,
  title: "Termos de Uso",
  intro:
    "Ao acessar e utilizar o site endocrinologista.tainaaci.com.br, você concorda com os presentes Termos de Uso. Caso não concorde, recomendamos que não utilize o site.",
  sections: [
    {
      id: "aceitacao",
      title: "1. Aceitação dos termos",
      paragraphs: [
        "Estes Termos de Uso regulam o acesso ao site institucional da Dra. Tainã Aci. O uso continuado do site após eventuais atualizações representa concordância com a versão vigente.",
      ],
    },
    {
      id: "objeto",
      title: "2. Objeto do site",
      paragraphs: [
        "O site tem caráter informativo e institucional, com o objetivo de apresentar especialidades, diferenciais do atendimento, localização e canais de contato para agendamento de consultas particulares.",
      ],
    },
    {
      id: "natureza-medica",
      title: "3. Natureza das informações",
      paragraphs: [
        "O conteúdo publicado no site não substitui consulta médica, diagnóstico ou tratamento individualizado. As informações têm finalidade educativa e de orientação geral.",
        "Cada caso clínico deve ser avaliado presencialmente ou por telemedicina, quando indicado, por profissional habilitado, com anamnese, exame físico e exames complementares conforme necessidade individual.",
      ],
    },
    {
      id: "uso-permitido",
      title: "4. Uso permitido",
      paragraphs: ["Ao utilizar o site, você se compromete a:"],
      list: [
        "Fornecer informações verdadeiras ao preencher formulários de contato.",
        "Não utilizar o site para fins ilícitos, ofensivos ou que prejudiquem terceiros.",
        "Não tentar comprometer a segurança, disponibilidade ou integridade da plataforma.",
        "Não reproduzir conteúdo do site sem autorização prévia, salvo uso pessoal e não comercial.",
      ],
    },
    {
      id: "propriedade",
      title: "5. Propriedade intelectual",
      paragraphs: [
        "Textos, imagens, logotipos, layout, vídeos e demais conteúdos do site são protegidos por direitos autorais e propriedade intelectual da Dra. Tainã Aci ou de licenciantes autorizados. O uso não autorizado pode violar a legislação aplicável.",
      ],
    },
    {
      id: "formularios",
      title: "6. Formulários e canais de contato",
      paragraphs: [
        "O envio de dados por formulário ou WhatsApp não garante agendamento imediato. A equipe analisará a solicitação e retornará pelos canais informados, dentro do horário de funcionamento.",
        "O atendimento médico oferecido pela Dra. Tainã Aci é particular, salvo quando expressamente indicado de outra forma em comunicações oficiais.",
      ],
    },
    {
      id: "links",
      title: "7. Links externos",
      paragraphs: [
        "O site pode conter links para páginas de terceiros (por exemplo, Instagram, Google Maps e WhatsApp). Não nos responsabilizamos pelo conteúdo, políticas ou práticas de sites externos.",
      ],
    },
    {
      id: "responsabilidade",
      title: "8. Limitação de responsabilidade",
      paragraphs: [
        "Empregamos esforços para manter o site disponível e atualizado, mas não garantimos ausência de interrupções, erros ou falhas técnicas.",
        "Na extensão permitida pela lei, a Dra. Tainã Aci não se responsabiliza por danos decorrentes do uso inadequado das informações do site ou de indisponibilidade temporária da plataforma.",
      ],
    },
    {
      id: "legislacao",
      title: "9. Legislação e foro",
      paragraphs: [
        "Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo — SP para dirimir controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja, salvo disposição legal em contrário.",
      ],
    },
  ],
}
