"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const instagramReels = [
  {
    url: "https://www.instagram.com/p/DCDPNW4u94p/",
    embedUrl: "https://www.instagram.com/p/DCDPNW4u94p/embed",
  },
  {
    url: "https://www.instagram.com/reel/C8fftB_hivb/",
    embedUrl: "https://www.instagram.com/reel/C8fftB_hivb/embed",
  },
  {
    url: "https://www.instagram.com/p/DBRI4QoOmYo/?img_index=1",
    embedUrl: "https://www.instagram.com/p/DBRI4QoOmYo/embed",
  },
  {
    url: "https://www.instagram.com/reel/DL0mNglu81r/",
    embedUrl: "https://www.instagram.com/reel/DL0mNglu81r/embed",
  },
  {
    url: "https://www.instagram.com/reel/C_G5oEKyRFD/",
    embedUrl: "https://www.instagram.com/reel/C_G5oEKyRFD/embed",
  },
  {
    url: "https://www.instagram.com/reel/C-EAqxTuJYk/",
    embedUrl: "https://www.instagram.com/reel/C-EAqxTuJYk/embed",
  },
  {
    url: "https://www.instagram.com/reel/DDuCOIKOw_y/",
    embedUrl: "https://www.instagram.com/reel/DDuCOIKOw_y/embed",
  },
] as const

interface InstagramReelsCarouselProps {
  hint?: string
}

export function InstagramReelsCarousel({
  hint = "Arraste para ver mais depoimentos",
}: InstagramReelsCarouselProps) {
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
    <div ref={ref}>
      <div className="relative">
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
              className="shrink-0 w-[320px] snap-center"
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

      <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className={`h-11 w-11 rounded-full bg-white shadow-md ${
            !canScrollLeft ? "opacity-40" : "opacity-100"
          }`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Depoimento anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`h-11 w-11 rounded-full bg-white shadow-md ${
            !canScrollRight ? "opacity-40" : "opacity-100"
          }`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Próximo depoimento"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {hint ? (
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>{hint}</p>
        </div>
      ) : null}
    </div>
  )
}
