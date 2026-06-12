"use client"

import { type RefObject } from "react"
import { gsap, registerGsapPlugins, ScrollTrigger, useGSAP } from "@/lib/gsap-config"

interface HomeGsapAnimationsProps {
  scope: RefObject<HTMLElement | null>
}

export function HomeGsapAnimations({ scope }: HomeGsapAnimationsProps) {
  useGSAP(
    () => {
      registerGsapPlugins()

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reducedMotion) return

      gsap.set("[data-gsap-hero-item]", { opacity: 0, y: 36 })
      gsap.set("[data-gsap-hero-image]", { opacity: 0, scale: 0.97 })
      gsap.set("[data-gsap-reveal]", { opacity: 0, y: 40 })
      gsap.set("[data-gsap-card]", { opacity: 0, y: 28 })
      gsap.set("[data-gsap-diff-text]", { opacity: 0 })
      gsap.set("[data-gsap-diff-image]", { opacity: 0 })

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      heroTl
        .to("[data-gsap-hero-item]", {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
        })
        .to(
          "[data-gsap-hero-image]",
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          0.15
        )

      ScrollTrigger.batch("[data-gsap-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            overwrite: true,
          })
        },
      })

      ScrollTrigger.batch("[data-gsap-card]", {
        start: "top 92%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              overwrite: true,
            }
          )
        },
      })

      ScrollTrigger.batch("[data-gsap-carousel]", {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", overwrite: true }
          )
        },
      })

      ScrollTrigger.batch("[data-gsap-differential]", {
        start: "top 85%",
        once: true,
        onEnter: (elements) => {
          elements.forEach((row) => {
            const text = row.querySelector("[data-gsap-diff-text]")
            const image = row.querySelector("[data-gsap-diff-image]")
            const reversed = row.getAttribute("data-gsap-differential") === "reversed"

            if (text) {
              gsap.fromTo(
                text,
                { opacity: 0, x: reversed ? 48 : -48, y: 0 },
                { opacity: 1, x: 0, y: 0, duration: 0.85, ease: "power2.out", overwrite: true }
              )
            }

            if (image) {
              gsap.fromTo(
                image,
                { opacity: 0, x: reversed ? -48 : 48, scale: 1.04 },
                {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "power2.out",
                  overwrite: true,
                },
                0.08
              )
            }
          })
        },
      })
    },
    { scope }
  )

  return null
}
