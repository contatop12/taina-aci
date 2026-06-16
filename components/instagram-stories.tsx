"use client"

import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import { INSTAGRAM_STORIES } from "@/lib/media"

const stories = INSTAGRAM_STORIES
const IMAGE_DURATION = 5000

export function InstagramStories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const imageStartRef = useRef<number>(0)
  const imageElapsedRef = useRef<number>(0)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const current = stories[currentIndex]
  const isVideo = current.type === "video"

  useEffect(() => {
    const firstVideo = stories.find((story) => story.type === "video")
    if (!firstVideo) return

    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "fetch"
    link.href = firstVideo.url
    link.crossOrigin = "anonymous"
    document.head.appendChild(link)

    return () => link.remove()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

  const playCurrentVideo = useCallback(() => {
    const video = videoRef.current
    if (!video || !isVideo || isPaused || !isInView) return

    video.muted = true

    const attemptPlay = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        void video.play().catch(() => {})
      }
    }

    attemptPlay()

    if (video.paused) {
      video.addEventListener("canplay", attemptPlay, { once: true })
      video.addEventListener("loadeddata", attemptPlay, { once: true })
    }
  }, [isVideo, isPaused, isInView])

  // Image timer
  useEffect(() => {
    if (isVideo) return
    if (isPaused || !isInView) {
      if (isPaused) {
        imageElapsedRef.current += Date.now() - imageStartRef.current
      }
      if (imageTimerRef.current) clearInterval(imageTimerRef.current)
      return
    }

    imageStartRef.current = Date.now()

    imageTimerRef.current = setInterval(() => {
      const elapsed = imageElapsedRef.current + (Date.now() - imageStartRef.current)
      const pct = Math.min((elapsed / IMAGE_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) goToNext()
    }, 50)

    return () => {
      if (imageTimerRef.current) clearInterval(imageTimerRef.current)
    }
  }, [isVideo, isPaused, isInView, currentIndex, goToNext])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setProgress((video.currentTime / video.duration) * 100)
  }, [])

  const handleVideoEnded = useCallback(() => {
    goToNext()
  }, [goToNext])

  // Play/pause current video when story, visibility or pause state changes
  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video || !isVideo) return

    if (isPaused || !isInView) {
      video.pause()
      return
    }

    video.currentTime = 0
    playCurrentVideo()
  }, [currentIndex, isVideo, isPaused, isInView, playCurrentVideo])

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
      diff > 0 ? goToNext() : goToPrev()
    }
  }

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-[min(100%,320px)] px-1 sm:max-w-sm sm:px-0">
      <div
        className="relative overflow-hidden rounded-3xl bg-black shadow-xl"
        style={{ aspectRatio: "9/16" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bars */}
        <div className="absolute left-3 right-3 top-3 z-20 flex gap-1">
          {stories.map((_, index) => (
            <div key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width:
                    index < currentIndex ? "100%" : index === currentIndex ? `${progress}%` : "0%",
                  transition: index === currentIndex ? "width 50ms linear" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute left-3 right-3 top-6 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-xs font-semibold text-white">TA</span>
            </div>
            <span className="text-sm font-medium text-white drop-shadow-md">Resultados</span>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="rounded-full bg-black/20 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
            aria-label={isPaused ? "Reproduzir" : "Pausar"}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>

        {/* Content — single active media element */}
        <div className="absolute inset-0">
          {isVideo ? (
            <video
              key={current.url}
              ref={videoRef}
              src={current.url}
              className="h-full w-full object-cover"
              playsInline
              muted
              autoPlay
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onCanPlay={playCurrentVideo}
            />
          ) : (
            <Image
              key={current.url}
              src={current.url}
              alt={`Resultado ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Click zones */}
        <button
          onClick={goToPrev}
          className="absolute bottom-16 left-0 top-16 z-10 w-1/3"
          aria-label="Anterior"
        />
        <button
          onClick={goToNext}
          className="absolute bottom-16 right-0 top-16 z-10 w-1/3"
          aria-label="Próximo"
        />

        {/* Desktop arrows */}
        <div className="absolute inset-y-0 left-0 z-10 hidden items-center pl-2 opacity-0 transition-opacity hover:opacity-100 md:flex">
          <button
            onClick={goToPrev}
            className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-10 hidden items-center pr-2 opacity-0 transition-opacity hover:opacity-100 md:flex">
          <button
            onClick={goToNext}
            className="rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
            aria-label="Próximo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot counter */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setProgress(0)
                imageElapsedRef.current = 0
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-4 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Story ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Arraste ou clique para navegar
      </p>
    </div>
  )
}
