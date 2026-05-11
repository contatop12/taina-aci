"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { ClipboardList, ListChecks, Microscope, UtensilsCrossed } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTAButton } from "@/components/ui/cta-button"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InstagramReelsCarousel } from "@/components/instagram-reels-carousel"

const CDN = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"
const FOTO_HERO = `${CDN}/foto-taina1.webp`
const FOTO_SOBRE = `${CDN}/foto-taina2.webp`
const VIDEO_OBJECAO = `${CDN}/story-05.mp4`
const WA_URL = "https://wa.me/5511951515103"

function carouselStoryUrls(): string[] {
  const nums: number[] = []
  for (let n = 4; n <= 21; n++) {
    if (n !== 5) nums.push(n)
  }
  for (let n = 25; n <= 29; n++) nums.push(n)
  return nums.map((n) => `${CDN}/story-${String(n).padStart(2, "0")}.mp4`)
}

const practiceCards = [
  {
    icon: ClipboardList,
    title: "Você não precisa se repetir toda vez",
    body:
      "Aqui você tem continuidade. A Dra. Tainã conhece seu histórico, seus exames anteriores, o que funcionou e o que não funcionou. Você não começa do zero a cada consulta.",
  },
  {
    icon: UtensilsCrossed,
    title: "A consulta já inclui o olhar nutricional",
    body:
      "Você não precisa agendar endocrinologista em um lugar e nutricionista em outro, torcer para que eles se comuniquem e ainda tentar conciliar as orientações. Tudo acontece junto, na mesma consulta.",
  },
  {
    icon: Microscope,
    title: "Exames que a maioria dos médicos não pede",
    body:
      "Quando faz sentido para o seu caso, a avaliação pode incluir teste genético, scanner corporal e bioimpedância. Não como diferencial de marketing. Como ferramenta clínica real para entender o que está acontecendo no seu metabolismo.",
  },
  {
    icon: ListChecks,
    title: "Você sai da consulta sabendo o que fazer",
    body:
      "Não com uma lista de orientações genéricas. Com um plano que foi pensado para a sua rotina, seu corpo e seus objetivos.",
  },
]

const pageReviews = [
  {
    quote: "Dra Tainã e sua equipe pensam em tudo, cada consulta é uma experiência!",
    author: "Marina Santos",
    initial: "M",
  },
  {
    quote: "Tainã já é médica da minha família, meu marido, eu e de amigas!",
    author: "Fernanda Lima",
    initial: "F",
  },
  {
    quote: "É excepcional a qualidade do serviço e cuidados que recebemos no consultório.",
    author: "Carla Rodrigues",
    initial: "C",
  },
]

const credentialLines = [
  "Residência em Clínica Médica, Hospital do Servidor Público Municipal de SP",
  "Residência em Endocrinologia, Hospital Santa Marcelina",
  "Mestrado em Inovação no Ensino em Saúde, USCS",
  "Especialista pela SBEM",
  "Membro da Endocrine Society (EUA)",
  "Pós-graduada em Nutrologia, ABRAN",
  "Fellow Research, McGill University, Canadá",
]

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function VideoSpotlight({
  src,
  className,
  label,
}: {
  src: string
  className?: string
  label: string
}) {
  return (
    <div
      className={`relative mx-auto max-w-xs overflow-hidden rounded-2xl bg-black shadow-xl ${className ?? ""}`}
      style={{ aspectRatio: "9/16" }}
    >
      <video
        className="h-full w-full object-cover"
        src={src}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-label={label}
      />
    </div>
  )
}

function StoryVideoCarousel() {
  const urls = carouselStoryUrls()
  const ref = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const syncArrows = () => {
    const el = ref.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanLeft(scrollLeft > 8)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 8)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    syncArrows()
    el.addEventListener("scroll", syncArrows)
    return () => el.removeEventListener("scroll", syncArrows)
  }, [])

  const scrollBy = (dir: "left" | "right") => {
    ref.current?.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    })
  }

  return (
    <div ref={sectionRef}>
      <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-primary">
        Mais histórias
      </p>
      <div className="relative">
        <button
          type="button"
          className={`absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-muted/80 md:flex ${
            !canLeft ? "pointer-events-none opacity-0" : ""
          } transition-opacity`}
          onClick={() => scrollBy("left")}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className={`absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg hover:bg-muted/80 md:flex ${
            !canRight ? "pointer-events-none opacity-0" : ""
          } transition-opacity`}
          onClick={() => scrollBy("right")}
          aria-label="Próximo"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={ref}
          className={`scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 transition-all duration-700 md:px-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {urls.map((url, index) => (
            <div
              key={url}
              className="relative w-[200px] flex-shrink-0 snap-center overflow-hidden rounded-xl bg-black shadow-md sm:w-[220px]"
              style={{ aspectRatio: "9/16" }}
            >
              <video
                src={url}
                className="h-full w-full object-cover"
                muted
                playsInline
                loop
                autoPlay
                preload="metadata"
                title={`História ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground">Arraste para ver mais</p>
    </div>
  )
}

export function PorQueParticularContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openWa = () => {
    window.open(WA_URL, "_blank")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      {/* Seção 1 Hero */}
      <section className="border-b border-border/60 pt-[90px] md:pt-[100px]">
        <div className="container mx-auto max-w-6xl px-4 py-14 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 aspect-[4/5] max-h-[420px] overflow-hidden rounded-2xl shadow-xl lg:order-1 lg:max-h-none">
              <Image
                src={FOTO_HERO}
                alt="Dra. Tainã Aci em seu consultório"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
            <div className="order-1 space-y-6 lg:order-2">
              <h1 className="font-serif text-3xl leading-tight text-balance md:text-4xl lg:text-[2.65rem]">
                Faz sentido você estar aqui.
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Muita gente que hoje é paciente da Dra. Tainã chegou exatamente pelo mesmo caminho que você:
                buscando convênio, sem saber se valeria o investimento particular. Hoje, a maioria diz que foi
                uma das melhores decisões que tomou para a própria saúde.
              </p>
              <div>
                <a
                  href="#entenda-como-funciona"
                  className="relative inline-flex items-center justify-center rounded-full bg-[#AABB6A] px-8 py-3.5 font-medium text-base text-white shadow-md transition-all hover:shadow-[0_4px_20px_rgba(170,187,106,0.45)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Quero entender como funciona
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 */}
      <section id="entenda-como-funciona" className="scroll-mt-28 py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-serif text-2xl text-balance md:text-4xl lg:text-[2.75rem]">
            Convênio não é errado. Só não é o que a Dra. Tainã oferece.
          </h2>

          <div className="mb-12 space-y-6 text-center text-muted-foreground leading-relaxed lg:text-[17px]">
            <p>
              O plano de saúde tem o papel dele. Para exames de rotina, urgências, procedimentos cirúrgicos, ele faz
              sentido. Mas quando o assunto é emagrecimento, hormônios, metabolismo, menopausa ou diabetes, o que faz
              diferença não é só o diagnóstico. É o que vem depois dele.
            </p>
            <p>
              Em uma consulta de convênio, o médico tem em média 10 a 15 minutos com você. Não é culpa dele. É o modelo.
              E nesse tempo, dificilmente dá para entender de verdade o que está acontecendo no seu corpo, montar uma
              estratégia personalizada e criar um acompanhamento que realmente funcione.
            </p>
            <p>
              A Dra. Tainã saiu desse modelo por escolha. Não para cobrar mais. Para conseguir fazer o trabalho do jeito
              que ela acredita que precisa ser feito.
            </p>
          </div>

          <VideoSpotlight src={VIDEO_OBJECAO} label="Depoimento em vídeo" />
        </div>
      </section>

      {/* Seção 3 */}
      <section className="border-t border-border/40 bg-muted/20 py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-4 font-serif text-3xl md:text-4xl">O que é diferente aqui, na prática</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Não é só o tempo de consulta. É o que acontece com esse tempo.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {practiceCards.map((card) => (
              <div
                key={card.title}
                className="border-border/40 rounded-2xl border bg-muted/50 p-5 md:p-6 flex flex-col gap-4 md:flex-row md:items-start md:gap-5"
              >
                <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 md:h-14 md:w-14">
                    <card.icon className="h-5 w-5 text-primary md:h-8 md:w-8" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="mb-2 text-base font-semibold leading-snug text-foreground md:text-lg">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 4 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="mx-auto mb-6 max-w-3xl font-serif text-3xl text-balance md:text-center md:text-4xl">
            Quem chegou com dúvida e decidiu tentar
          </h2>

          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed">
            Mais de Mil vidas transformadas. Muito além do sucesso clínico, o que meus pacientes mais valorizam é o
            acolhimento e a certeza de que, finalmente, encontraram um lugar onde são ouvidos de verdade.
          </p>

          <div className="mb-12">
            <InstagramReelsCarousel />
          </div>

          <div className="mx-auto mb-16 max-w-4xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-10">
            <div className="mb-8 flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xl font-bold">5.0</span>
              </div>
              <p className="text-muted-foreground text-sm font-medium">184 avaliações no Google</p>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <GoogleIcon className="h-5 w-5" />
                <span>Avaliações verificadas</span>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {pageReviews.map((r) => (
                <article
                  key={r.author}
                  className="flex flex-col rounded-xl border border-border/50 bg-muted/20 p-5 shadow-sm md:border-l-4 md:border-l-secondary"
                >
                  <StarRow />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">&ldquo;{r.quote}&rdquo;</p>
                  <Separator className="my-5" />
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="bg-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        <span className="text-secondary-foreground text-sm font-semibold">{r.initial}</span>
                      </div>
                      <span className="truncate text-sm font-medium text-foreground">{r.author}</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-muted-foreground">
                      <GoogleIcon className="h-4 w-4" />
                      <span className="text-xs font-medium">Google</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <StoryVideoCarousel />
        </div>
      </section>

      {/* Seção 5 */}
      <section className="border-t border-border/40 bg-background py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl shadow-xl lg:mx-0">
              <Image
                src={FOTO_SOBRE}
                alt="Dra. Tainã Aci"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl">Por que confiar nela?</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed lg:text-[17px]">
                <p>
                  A Dra. Tainã não é médica de consultório de shopping que atende 30 pacientes por dia. Ela tem agenda
                  reduzida por escolha, porque sabe que qualidade de acompanhamento e volume alto não combinam.
                </p>
                <p>
                  São 14 anos de formação. Duas residências médicas. Mestrado. Especialização pela SBEM. Pesquisa no
                  Canadá. Mas o que os pacientes mais falam não é sobre o currículo. É sobre como ela escuta.
                </p>
                <p>
                  Ela atua também na formação de outros médicos, o que significa que ela está constantemente
                  atualizada, questionando condutas e buscando o que há de mais atual na literatura científica.
                </p>
              </div>

              <Separator className="bg-border/80" />

              <ol className="list-none space-y-4">
                {credentialLines.map((line, idx) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-primary w-8 shrink-0 font-semibold tabular-nums">{idx + 1}.</span>
                    <span className="text-foreground text-[15px] leading-snug">{line}</span>
                  </li>
                ))}
              </ol>
              <p className="text-foreground text-sm font-medium">CRM 166519 | RQE 81061</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 6 */}
      <section className="bg-foreground py-16 text-white lg:py-28">
        <div className="container mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-12 text-center font-serif text-3xl text-balance md:text-[2.4rem] lg:text-[2.6rem]">
            O que custa continuar sem um acompanhamento que funciona?
          </h2>
          <div className="space-y-6 text-center text-[17px] leading-relaxed text-white/85">
            <p>Não é uma crítica. É uma pergunta honesta.</p>
            <p>
              Quantas vezes você já tentou emagrecer e voltou para o mesmo peso? Quantas consultas você fez onde saiu
              com uma receita e sem entender direito o que estava acontecendo? Quantos sintomas você normalizou porque
              todo mundo tem isso?
            </p>
            <p>
              O custo de um acompanhamento inadequado não aparece na fatura. Aparece no tempo perdido, nas tentativas
              frustradas, no cansaço de recomeçar sempre do zero e na sensação de que o seu corpo não responde.
            </p>
            <p>Às vezes o que parece mais caro no curto prazo é o que economiza mais no longo.</p>
          </div>
          <div className="mt-12 flex justify-center">
            <CTAButton size="lg" onClick={openWa}>
              Falar pelo WhatsApp
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Seção 7 */}
      <section className="py-16 lg:py-28">
        <div className="container mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="mb-10 font-serif text-3xl text-balance md:text-4xl">
            Se fizer sentido para você, a equipe pode te explicar tudo
          </h2>
          <div className="mb-12 space-y-6 text-muted-foreground mx-auto leading-relaxed text-lg">
            <p>
              Sem compromisso. Sem pressão. A equipe da Dra. Tainã pode te contar como funciona a consulta particular,
              tirar suas dúvidas sobre valores e te ajudar a entender se esse é o momento certo para você.
            </p>
            <p>
              A agenda é reduzida justamente para manter a qualidade. Se você chegou até aqui, vale pelo menos uma
              conversa.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <CTAButton size="lg" onClick={openWa}>
              Quero falar com a equipe pelo WhatsApp
            </CTAButton>
            <Button variant="outline" size="default" className="max-w-lg shrink text-sm leading-snug h-auto py-3 px-6" asChild>
              <a href="https://endocrinologista.tainaaci.com.br/" rel="noopener noreferrer">
                Voltar para o início e saber mais sobre a Dra. Tainã
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton onOpenModal={() => setIsModalOpen(true)} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
