"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onOpenModal: () => void
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="pt-20 md:pt-[70px] min-h-[100svh] flex items-center">
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Mobile: Image first, Desktop: Text first */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FOTO%20TAINA1-2BJX8A68XuuPN4jOi6zgOVMJXZUqd7.jpg"
                alt="Dra. Tainã Aci em seu consultório"
                width={600}
                height={750}
                className="rounded-2xl shadow-xl object-cover w-full aspect-[4/5] lg:aspect-auto"
                priority
              />
            </div>
          </div>

          <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-balance">
                Endocrinologista na Vila Mariana
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Emagrecimento, Hormônios e Saúde Metabólica
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button
                onClick={onOpenModal}
                size="lg"
                className="bg-[#AABB6A] hover:bg-[#9AAB5A] text-white font-medium px-8 py-6 text-base w-full sm:w-auto"
              >
                Agendar consulta
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Nossa equipe entrará em contato pelo WhatsApp
            </p>

            {/* Credenciais */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-primary">CRM 166519</span>
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="text-primary">RQE 81061</span>
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="text-sm text-muted-foreground">
                Membro SBEM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
