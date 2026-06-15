"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { FOTO_TAINA_1, HERO_PORTRAIT_VIDEO_URL } from "@/lib/media"

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const play = () => {
      void video.play().catch(() => {})
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play()
    } else {
      video.addEventListener("loadeddata", play, { once: true })
    }

    video.addEventListener("canplay", play)

    return () => video.removeEventListener("canplay", play)
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={FOTO_TAINA_1}
        alt="Dra. Tainã Aci em seu consultório"
        fill
        className={cn("object-cover object-center", imageClassName)}
        priority={priority}
        sizes={sizes}
      />

      <video
        ref={videoRef}
        src={HERO_PORTRAIT_VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={FOTO_TAINA_1}
      />
    </div>
  )
}
