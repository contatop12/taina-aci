"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"

const quickLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
  { label: "Perguntas Frequentes", href: "#faq" },
]

export function Footer() {
  return (
    <footer className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-taina-aci-endocrinologista-EbAIwBI2XjhD3n9QlAL4BKoBmVz2qC.png"
              alt="Dra. Tainã Aci - Endocrinologia e Metabologia Nutrologia"
              width={280}
              height={70}
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-sm leading-relaxed text-white/80">
              Endocrinologista na Vila Mariana especializada em emagrecimento, tratamento hormonal e saúde metabólica. 
              Atendimento humanizado e personalizado.
            </p>
            <p className="text-sm text-white/70">
              CRM: 166519 | RQE: 81061
            </p>
            <a
              href="https://www.instagram.com/taina.aci/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
              @taina.aci
            </a>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="font-semibold text-base mb-5">Links Rápidos</h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Endereço */}
          <div>
            <h3 className="font-semibold text-base mb-5">Endereço</h3>
            <a
              href="https://www.google.com/maps/place/Dra.+Tain%C3%A3+Aci/data=!4m2!3m1!1s0x0:0xe19524e5e4d5f9b3?sa=X&ved=1t:2428&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-white/80 hover:text-white transition-colors leading-relaxed"
            >
              Torre Paris - R. Domingos de Morais, 2187<br />
              CJ 405 - Vila Mariana<br />
              São Paulo - SP, 04035-000
            </a>
          </div>

          {/* Coluna 4: Horário de Funcionamento */}
          <div>
            <h3 className="font-semibold text-base mb-5">Horário</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>Segunda a Sexta: 09h às 18h</p>
              <p className="text-white/60">Sábado e Domingo: Fechado</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Dra. Tainã Aci — Todos os direitos reservados
          </p>
          <p className="text-xs text-white/40 mt-2">
            Desenvolvido por{" "}
            <a
              href="https://leads.p12digital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              P12
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
