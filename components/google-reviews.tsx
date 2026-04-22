"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const reviews = [
  {
    quote: "Dra Tainã e sua equipe pensam em tudo, cada consulta é um experiência!",
    author: "Marina Santos",
    rating: 5,
    initial: "M",
  },
  {
    quote: "Tainã já é médica da minha família, meu marido eu e de amigas!",
    author: "Fernanda Lima",
    rating: 5,
    initial: "F",
  },
  {
    quote: "É excepcional a qualidade do serviço e cuidados que recebemos no consultório.",
    author: "Carla Rodrigues",
    rating: 5,
    initial: "C",
  },
  {
    quote: "Atendimento humanizado, a Dra. Tainã realmente escuta e entende as necessidades de cada paciente.",
    author: "Patricia Oliveira",
    rating: 5,
    initial: "P",
  },
  {
    quote: "Profissional extremamente competente e atenciosa. Recomendo de olhos fechados!",
    author: "Ana Paula Mendes",
    rating: 5,
    initial: "A",
  },
  {
    quote: "Médica muito atenciosa e competente! Me senti muito bem acolhida desde a primeira consulta.",
    author: "Juliana Costa",
    rating: 5,
    initial: "J",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  )
}

export function GoogleReviews() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    const scrollEl = scrollRef.current
    if (scrollEl) {
      scrollEl.addEventListener("scroll", updateScrollButtons)
      return () => scrollEl.removeEventListener("scroll", updateScrollButtons)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="avaliacoes" className="py-24 lg:py-32 bg-muted/30">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Avaliações no{" "}
            <span className="text-blue-600 underline decoration-blue-600 underline-offset-4">
              Google
            </span>
          </h2>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xl font-bold">5.0</span>
          </div>

          <p className="text-muted-foreground mb-4">184 avaliações</p>

          <a
            href="https://www.google.com/search?q=taina+aci#mpd=~17248255284670642018/customers/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4 transition-colors"
          >
            Ver todos os comentários do Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Ver avaliações anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Ver mais avaliações"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-secondary"
              >
                <StarRating rating={review.rating} />
                <p className="mt-4 text-foreground leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-sm font-semibold text-secondary-foreground">
                        {review.initial}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {review.author}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">Google</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
