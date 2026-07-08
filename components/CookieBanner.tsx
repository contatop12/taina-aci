"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LEGAL_PAGE_PATH, PRIVACY_SECTION_ID } from "@/lib/legal-content"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cookie-consent") !== "accepted") {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#7A8B6E] shadow-[0_-2px_8px_rgba(0,0,0,0.2)] px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <p className="text-white text-sm flex-1 text-center sm:text-left">
          Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
          <Link
            href={`${LEGAL_PAGE_PATH}#${PRIVACY_SECTION_ID}`}
            className="underline underline-offset-2 hover:text-white/90"
          >
            política de privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-[#AABB6A] text-[#1A1A1A] font-semibold text-sm px-5 py-2 rounded-[var(--radius)] hover:bg-[#99aa58] transition-colors cursor-pointer border-0"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
