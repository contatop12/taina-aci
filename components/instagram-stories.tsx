"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import { INSTAGRAM_STORIES } from "@/lib/media"

const stories = INSTAGRAM_STORIES
const IMAGE_DURATION = 5000

export function InstagramStories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const imageStartRef = useRef<number>(0)
  const imageElapsedRef = useRef<number>(0)

  const current = stories[currentIndex]
  const isVideo = current.type === "video"

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
    setProgress(0)
    imageElapsedRef.current = 0
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
    setProgress(0)
    imageElapsedRef.current = 0
  }, [])

  // Image timer
  useEffect(() => {
    if (isVideo) return
    if (isPaused) {
      imageElapsedRef.current += Date.now() - imageStartRef.current
      if (imageTimerRef.current) clearInterval(imageTimerRef.current)
      return
    }

    imageStartRef.current = Date.now()
    const remaining = IMAGE_DURATION - imageElapsedRef.current

    imageTimerRef.current = setInterval(() => {
      const elapsed = imageElapsedRef.current + (Date.now() - imageStartRef.current)
      const pct = Math.min((elapsed / IMAGE_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) goToNext()
    }, 50)

    return () => { if (imageTimerRef.current) clearInterval(imageTimerRef.current) }
  }, [isVideo, isPaused, currentIndex, goToNext])

  // Video progress tracking
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }, [])

  const handleVideoEnded = useCallback(() => {
    goToNext()
  }, [goToNext])

  // Control video play/pause and autoplay on index change
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVideo) return

    if (isPaused) {
      video.pause()
      return
    }

    const startPlayback = () => {
      video.currentTime = 0
      void video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      startPlayback()
      return
    }

    video.addEventListener("loadeddata", startPlayback, { once: true })
    return () => video.removeEventListener("loadeddata", startPlayback)
  }, [isPaused, isVideo, currentIndex])

  // Touch/swipe support
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) { diff > 0 ? goToNext() : goToPrev() }
  }

  return (
    <div ref={containerRef} className="w-full max-w-sm mx-auto">
      <div
        className="relative bg-black rounded-3xl overflow-hidden shadow-xl"
        style={{ aspectRatio: "9/16" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {stories.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{
                  width: index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                  transition: index === currentIndex ? "width 50ms linear" : "none",
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
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/30 transition-colors"
            aria-label={isPaused ? "Reproduzir" : "Pausar"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>

        {/* Content */}
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {story.type === "image" ? (
              <Image
                src={story.url}
                alt={`Resultado ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            ) : (
              <video
                ref={index === currentIndex ? videoRef : undefined}
                src={story.url}
                className="w-full h-full object-cover"
                playsInline
                muted
                preload={index === currentIndex ? "auto" : "metadata"}
                onTimeUpdate={index === currentIndex ? handleTimeUpdate : undefined}
                onEnded={index === currentIndex ? handleVideoEnded : undefined}
              />
            )}
          </div>
        ))}

        {/* Click zones */}
        <button onClick={goToPrev} className="absolute left-0 top-16 bottom-16 w-1/3 z-10" aria-label="Anterior" />
        <button onClick={goToNext} className="absolute right-0 top-16 bottom-16 w-1/3 z-10" aria-label="Próximo" />

        {/* Desktop arrows */}
        <div className="hidden md:flex absolute inset-y-0 left-0 items-center pl-2 opacity-0 hover:opacity-100 transition-opacity z-10">
          <button onClick={goToPrev} className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Anterior">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex absolute inset-y-0 right-0 items-center pr-2 opacity-0 hover:opacity-100 transition-opacity z-10">
          <button onClick={goToNext} className="p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors" aria-label="Próximo">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setProgress(0); imageElapsedRef.current = 0 }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              aria-label={`Story ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">Arraste ou clique para navegar</p>
    </div>
  )
}
