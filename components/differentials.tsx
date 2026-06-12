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

function DifferentialVisual({ item, index }: { item: DifferentialItem; index: number }) {
  const Icon = item.icon

  if (item.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#EEF1E8] via-[#F7F6F3] to-[#E8E4DC]">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(122,139,110,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,184,168,0.3) 0%, transparent 45%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/15 bg-white/70 shadow-[0_8px_32px_rgba(122,139,110,0.12)] backdrop-blur-sm">
          <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      <span className="absolute bottom-4 left-5 font-serif text-5xl leading-none text-primary/10 tabular-nums select-none">
        0{index + 1}
      </span>
    </div>
  )
}

export function Differentials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const total = differentials.length
  const active = differentials[activeIndex]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return
      setIsAnimating(true)
      setActiveIndex((index + total) % total)
      window.setTimeout(() => setIsAnimating(false), 420)
    },
    [activeIndex, isAnimating, total]
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 48) {
      if (delta > 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  return (
    <section id="diferenciais" className="overflow-hidden bg-background py-24 lg:py-32">
      <div
        ref={sectionRef}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 lg:px-8",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Diferenciais
          </p>
          <h2 className="font-serif text-3xl text-balance md:text-4xl lg:text-5xl">
            Um modelo de consulta que você não encontra no convencional
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_24px_64px_rgba(92,88,86,0.08)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-roledescription="carrossel"
            aria-label="Diferenciais do atendimento"
          >
            <div
              key={activeIndex}
              className={cn(
                "animate-in fade-in slide-in-from-right-4 duration-400 fill-mode-both",
                isAnimating && "pointer-events-none"
              )}
            >
              <DifferentialVisual item={active} index={activeIndex} />

              <div className="space-y-5 px-6 py-8 md:px-10 md:py-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary tabular-nums">
                    0{activeIndex + 1} / 0{total}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <h3 className="font-serif text-2xl leading-snug text-balance text-foreground md:text-[1.65rem]">
                  {active.title}
                </h3>

                <p className="text-[15px] leading-[1.75] text-muted-foreground md:text-base">
                  {active.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Navegação dos diferenciais">
              {differentials.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Ir para: ${item.title}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-primary/40"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-muted/50"
                aria-label="Diferencial anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-muted/50"
                aria-label="Próximo diferencial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
            Deslize para ver mais diferenciais
          </p>
        </div>
      </div>
    </section>
  )
}
