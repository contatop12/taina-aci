import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { LOGO_PRINCIPAL } from "@/lib/media"
import {
  LEGAL_LAST_UPDATED,
  PRIVACY_SECTION_ID,
  TERMS_SECTION_ID,
  privacyPolicy,
  termsOfUse,
  type LegalDocument,
} from "@/lib/legal-content"
import { VILA_MARIANA_FLOW } from "@/lib/form-flows"

function LegalDocumentSection({ document }: { document: LegalDocument }) {
  return (
    <section id={document.id} className="scroll-mt-28">
      <h2 className="font-serif text-3xl text-foreground mb-4">{document.title}</h2>
      <p className="text-muted-foreground leading-relaxed mb-8">{document.intro}</p>

      <div className="space-y-8">
        {document.sections.map((section) => (
          <article key={section.id} id={section.id} className="scroll-mt-28">
            <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function LegalPageContent() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-white/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8 h-[70px] md:h-[80px] flex items-center justify-between gap-4">
          <Link
            href={VILA_MARIANA_FLOW.homePath}
            aria-label="Voltar para a página inicial"
            className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Image
              src={LOGO_PRINCIPAL}
              alt="Dra. Tainã Aci"
              width={220}
              height={56}
              className="h-11 md:h-14 w-auto"
              priority
            />
          </Link>
          <Link
            href={VILA_MARIANA_FLOW.homePath}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
          Documentos legais
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
          Política de Privacidade e Termos de Uso
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Última atualização: {LEGAL_LAST_UPDATED}
        </p>

        <nav
          aria-label="Índice da página"
          className="mb-12 rounded-2xl border border-border bg-muted/40 p-5 md:p-6"
        >
          <p className="text-sm font-semibold text-foreground mb-3">Nesta página</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`#${PRIVACY_SECTION_ID}`} className="text-primary hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href={`#${TERMS_SECTION_ID}`} className="text-primary hover:underline">
                Termos de Uso
              </a>
            </li>
          </ul>
        </nav>

        <div className="space-y-16">
          <LegalDocumentSection document={privacyPolicy} />
          <div className="h-px bg-border" aria-hidden="true" />
          <LegalDocumentSection document={termsOfUse} />
        </div>

        <p className="mt-12 text-sm text-muted-foreground leading-relaxed">
          Em caso de dúvidas sobre estes documentos, fale com nossa equipe pelo{" "}
          <a href="https://wa.me/5511951515103" className="text-primary hover:underline">
            WhatsApp (11) 95151-5103
          </a>
          .
        </p>
      </div>

      <Footer />
    </main>
  )
}
