"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const instagramReels = [
  {
    url: "https://www.instagram.com/p/DCDPNW4u94p/",
    embedUrl: "https://www.instagram.com/p/DCDPNW4u94p/embed",
  },
  {
    url: "https://www.instagram.com/reel/C9dnzQfOYPr/",
    embedUrl: "https://www.instagram.com/reel/C9dnzQfOYPr/embed",
  },
  {
    url: "https://www.instagram.com/reel/DGy0VwfOJl3/",
    embedUrl: "https://www.instagram.com/reel/DGy0VwfOJl3/embed",
  },
  {
    url: "https://www.instagram.com/reel/C-EAqxTuJYk/",
    embedUrl: "https://www.instagram.com/reel/C-EAqxTuJYk/embed",
  },
  {
    url: "https://www.instagram.com/p/DBRI4QoOmYo/",
    embedUrl: "https://www.instagram.com/p/DBRI4QoOmYo/embed",
  },
  {
    url: "https://www.instagram.com/reel/C8fftB_hivb/",
    embedUrl: "https://www.instagram.com/reel/C8fftB_hivb/embed",
  },
  {
    url: "https://www.instagram.com/reel/C_G5oEKyRFD/",
    embedUrl: "https://www.instagram.com/reel/C_G5oEKyRFD/embed",
  },
  {
    url: "https://www.instagram.com/reel/DL0mNglu81r/",
    embedUrl: "https://www.instagram.com/reel/DL0mNglu81r/embed",
  },
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
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
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScrollButtons)
      checkScrollButtons()
      return () => container.removeEventListener("scroll", checkScrollButtons)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-muted">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Depoimentos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-balance">
            Pacientes que decidiram investir na própria saúde
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados reais de pessoas reais — sem filtros, sem roteiros.
          </p>
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full hidden md:flex ${
              !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity`}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full hidden md:flex ${
              !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
            } transition-opacity`}
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory md:px-12 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {instagramReels.map((reel, index) => (
              <div
                key={reel.url}
                className="flex-shrink-0 w-[320px] snap-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
                  <iframe
                    src={reel.embedUrl}
                    className="w-full h-[480px] border-0"
                    allowFullScreen
                    allow="encrypted-media"
                    loading="lazy"
                    title={`Depoimento de paciente ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Arraste para ver mais depoimentos</p>
        </div>
      </div>
    </section>
  )
}
