"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Building, Globe, ExternalLink } from "lucide-react"

interface LocationProps {
  onOpenModal: () => void
}

export function Location({ onOpenModal }: LocationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="localizacao" className="py-24 lg:py-32 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
                Onde nos encontrar
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
                Atendimento presencial na Vila Mariana ou online para todo o Brasil
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">R. Domingos de Morais, 2187, CJ 406</p>
                  <p className="text-muted-foreground">Torre Paris — Vila Mariana, São Paulo</p>
                  <p className="text-muted-foreground">CEP: 04035-000</p>
                  <a
                    href="https://www.google.com/maps/place/Dra.+Tain%C3%A3+Aci/@-23.5955078,-46.6389603,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce5b570c390735:0xe19524e5e4d5f9b3!8m2!3d-23.5955127!4d-46.6363854!16s%2Fg%2F11ss1k2p34?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Abrir no Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Horário de Atendimento</p>
                  <p className="text-muted-foreground">Segunda a Sexta: 9h30 às 18h30</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Building className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Presencial — Vila Mariana</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Online — Todo o Brasil</span>
              </div>
            </div>

            <Button
              onClick={onOpenModal}
              className="bg-[#AABB6A] hover:bg-[#9AAB5A] text-white font-medium px-8 py-6 text-base"
            >
              Quero agendar minha consulta
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.6893825089!2d-46.63819492469063!3d-23.589841363178455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a2b2ed7f3a1%3A0x8f5e3cf4e2f9f3a1!2sR.%20Domingos%20de%20Morais%2C%202187%20-%20Vila%20Mariana%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004035-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do consultório"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
