"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { getDataLayer } from "@/lib/tracking"

export function PageviewTracker() {
  const pathname = usePathname()
  const lastUrlRef = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const search = window.location.search ?? ""
    const url = `${pathname}${search}`

    if (lastUrlRef.current === url) return
    lastUrlRef.current = url

    getDataLayer().push({
      event: "page_view",
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      page_referrer: document.referrer,
    })
  }, [pathname])

  return null
}
