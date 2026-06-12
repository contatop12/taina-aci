"use client"

import { useEffect, useState } from "react"

interface UseDeferredMediaOptions {
  enabled?: boolean
  rootMargin?: string
  idleTimeoutMs?: number
}

/**
 * Só libera a URL de mídia depois que o elemento entra na viewport
 * e o browser está ocioso — evita competir com o carregamento inicial da página.
 */
export function useDeferredMedia(
  ref: React.RefObject<HTMLElement | null>,
  mediaUrl: string,
  { enabled = true, rootMargin = "200px", idleTimeoutMs = 2000 }: UseDeferredMediaOptions = {}
): string | null {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || src) return

    let cancelled = false
    let observer: IntersectionObserver | null = null

    const activate = () => {
      if (!cancelled) setSrc(mediaUrl)
    }

    const observe = (el: HTMLElement) => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer?.disconnect()

          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(activate, { timeout: idleTimeoutMs })
          } else {
            window.setTimeout(activate, 1200)
          }
        },
        { rootMargin, threshold: 0.01 }
      )

      observer.observe(el)
    }

    const el = ref.current
    if (el) {
      observe(el)
    } else {
      const id = window.requestAnimationFrame(() => {
        const node = ref.current
        if (!cancelled && node) observe(node)
      })

      return () => {
        cancelled = true
        window.cancelAnimationFrame(id)
        observer?.disconnect()
      }
    }

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [enabled, idleTimeoutMs, mediaUrl, ref, rootMargin, src])

  return src
}
