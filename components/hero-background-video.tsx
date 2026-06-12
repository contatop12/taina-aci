"use client"

import { useEffect, useRef } from "react"
import { HERO_VIDEO_URL } from "@/lib/media"

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const play = () => {
      void video.play().catch(() => {})
    }

    play()
    video.addEventListener("canplay", play)

    return () => video.removeEventListener("canplay", play)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  )
}
