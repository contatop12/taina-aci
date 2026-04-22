"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"

// Stories highlight images - add your actual story images here
const stories = [
  { id: 1, image: "/stories/story-1.jpg" },
  { id: 2, image: "/stories/story-2.jpg" },
  { id: 3, image: "/stories/story-3.jpg" },
  { id: 4, image: "/stories/story-4.jpg" },
  { id: 5, image: "/stories/story-5.jpg" },
]

const STORY_DURATION = 5000 // 5 seconds per story

export function InstagramStories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
    setProgress(0)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
    setProgress(0)
  }, [])

  // Auto-advance stories
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      return
    }

    const step = 100 / (STORY_DURATION / 50)
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext()
          return 0
        }
        return prev + step
      })
    }, 50)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPaused, currentIndex, goToNext])

  // Touch/swipe support
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrev()
      }
    }
  }

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Stories Container - Phone-like frame */}
      <div 
        ref={containerRef}
        className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-3xl overflow-hidden shadow-xl"
        style={{ aspectRatio: "9/16" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {stories.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{
                  width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                  transitionDuration: index === currentIndex ? "50ms" : "0ms"
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-3 right-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-xs font-semibold">TA</span>
            </div>
            <span className="text-white text-sm font-medium drop-shadow-md">Resultados</span>
          </div>
          
          {/* Pause/Play button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"
            aria-label={isPaused ? "Reproduzir" : "Pausar"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Story Content */}
        <div className="relative w-full h-full">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {!imageError[index] ? (
                <Image
                  src={story.image}
                  alt={`Resultado ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                  priority={index === 0}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary/30 to-primary/50 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm opacity-80">
                      Adicione a imagem em<br />
                      <code className="text-xs bg-black/20 px-2 py-1 rounded mt-1 inline-block">
                        /public/stories/story-{index + 1}.jpg
                      </code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation - Click areas */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-16 bottom-16 w-1/3 z-10"
          aria-label="Story anterior"
        />
        <button
          onClick={goToNext}
          className="absolute right-0 top-16 bottom-16 w-1/3 z-10"
          aria-label="Próximo story"
        />

        {/* Navigation arrows (visible on hover on desktop) */}
        <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-2 opacity-0 hover:opacity-100 transition-opacity z-10">
          <button
            onClick={goToPrev}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
            aria-label="Story anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-2 opacity-0 hover:opacity-100 transition-opacity z-10">
          <button
            onClick={goToNext}
            className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
            aria-label="Próximo story"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Story counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setProgress(0)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Ir para story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Caption below */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Arraste ou clique para navegar
      </p>
    </div>
  )
}
