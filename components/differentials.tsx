"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { BookOpen, ChevronLeft, ChevronRight, Microscope, Pill, Users, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface DifferentialItem {
  icon: LucideIcon
  title: string
  description: string
  image?: string
}

const differentials: DifferentialItem[] = [
  {
    icon: BookOpen,
    title: "Medicina Baseada em Evidência",
    description:
      "Após 14 anos de formação, com duas residências médicas, dois registros de qualificação de especialista e mestrado profissional, a Dra. Tainã leva a sério o tratamento com embasamento científico correto. Cada decisão clínica é fundamentada em evidências robustas, associada a uma escuta ativa para identificar o que realmente funciona para a realidade de cada paciente.",
  },
  {
    icon: Users,
    title: "Consulta Médica + Nutricional Integrada",
    description:
      "No programa de acompanhamento da Dra. Tainã — com resultados altamente positivos comprovados no consultório — você não precisa agendar uma consulta com endocrinologista e outra com nutricionista separadamente. O atendimento é realizado em conjunto: otimização do tratamento endocrinológico e ajustes da estratégia alimentar, com o paciente participando ativamente de cada decisão.",
  },
  {
    icon: Microscope,
    title: "Exames Avançados: Teste Genético, Scanner Corporal e Bioimpedância",
    description:
      "Avaliação completa do seu metabolismo com teste genético, scanner corporal e bioimpedância, usando tecnologia de ponta para um diagnóstico mais preciso e um plano mais eficaz.",
  },
  {
    icon: Pill,
    title: "Quando indicado: tratamento medicamentoso acompanhado",
    description:
      "Avanços recentes trouxeram opções eficazes para o tratamento da obesidade e do diabetes, com benefícios no peso e no controle metabólico. A escolha da medicação deve ser criteriosa e personalizada. O acompanhamento profissional permite ajustes precisos para otimizar os resultados e a sua manutenção a longo prazo.",
  },
]

const COUNT = differentials.length
const LOOP_ITEMS = [...differentials, ...differentials, ...differentials]
const START_INDEX = COUNT

function getSlidesPerView(width: number) {
  if (width < 640) return 1
  if (width < 1024) return 2
  return 3
}

function DifferentialCard({
  item,
  isActive,
}: {
  item: DifferentialItem
  isActive: boolean
}) {
  const Icon = item.icon

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-colors duration-300",
        isActive ? "border-primary/25" : "border-border/60"
      )}
    >
      {item.image ? (
        <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>
      ) : (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
      )}

      <h3 className="mb-2 text-base font-semibold leading-snug text-card-foreground text-balance">
        {item.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </article>
  )
}

export function Differentials() {
  const touchStartX = useRef<number | null>(null)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [index, setIndex] = useState(START_INDEX)
  const [enableTransition, setEnableTransition] = useState(true)

  const logicalIndex = ((index - START_INDEX) % COUNT + COUNT) % COUNT

  useEffect(() => {
    const update = () => setSlidesPerView(getSlidesPerView(window.innerWidth))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const resetLoop = useCallback((nextIndex: number) => {
    setEnableTransition(false)
    setIndex(nextIndex)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnableTransition(true))
    })
  }, [])

  const handleTransitionEnd = useCallback(() => {
    if (index >= COUNT * 2) {
      resetLoop(index - COUNT)
    } else if (index < COUNT) {
      resetLoop(index + COUNT)
    }
  }, [index, resetLoop])

  const goNext = useCallback(() => setIndex((i) => i + 1), [])
  const goPrev = useCallback(() => setIndex((i) => i - 1), [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const gap = 24
  const centerOffset = Math.floor(slidesPerView / 2)
  const slideStep = `((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView} + ${gap}px)`

  return (
    <section id="diferenciais" className="overflow-hidden bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center md:mb-16" data-gsap-reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Diferenciais
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl text-balance md:text-4xl lg:text-5xl">
            Um modelo de consulta que você não encontra no convencional
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl px-10 md:px-12" data-gsap-carousel>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:text-foreground md:flex"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carrossel"
            aria-label="Diferenciais do atendimento"
          >
            <div
              className={cn("flex", enableTransition && "transition-transform duration-500 ease-out")}
              style={{
                gap: `${gap}px`,
                transform: `translateX(calc(-${index} * ${slideStep}))`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {LOOP_ITEMS.map((item, i) => (
                <div
                  key={`${item.title}-${i}`}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(slidesPerView - 1) * gap}px) / ${slidesPerView})`,
                  }}
                >
                  <DifferentialCard item={item} isActive={i === index + centerOffset} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {differentials.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Ir para: ${item.title}`}
                onClick={() => {
                  setEnableTransition(true)
                  setIndex(START_INDEX + i)
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === logicalIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
