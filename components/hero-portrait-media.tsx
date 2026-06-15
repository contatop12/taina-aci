"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { FOTO_TAINA_1, HERO_PORTRAIT_VIDEO_URL } from "@/lib/media"

const IMAGE_HOLD_MS = 3000

interface HeroPortraitMediaProps {
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
}

export function HeroPortraitMedia({
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 600px",
}: HeroPortraitMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowVideo(true), IMAGE_HOLD_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showVideo) return

    const video = videoRef.current
    if (!video) return

    video.muted = true

    const play = () => {
      void video.play().catch(() => {})
    }

    play()
    video.addEventListener("canplay", play)

    return () => video.removeEventListener("canplay", play)
  }, [showVideo])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={FOTO_TAINA_1}
        alt="Dra. Tainã Aci em seu consultório"
        fill
        className={cn(
          "object-cover object-center transition-opacity duration-700",
          showVideo ? "opacity-0" : "opacity-100",
          imageClassName
        )}
        priority={priority}
        sizes={sizes}
      />

      <video
        ref={videoRef}
        src={showVideo ? HERO_PORTRAIT_VIDEO_URL : undefined}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
          showVideo ? "opacity-100" : "opacity-0"
        )}
        autoPlay={showVideo}
        muted
        loop
        playsInline
        preload="none"
        poster={FOTO_TAINA_1}
      />
    </div>
  )
}
