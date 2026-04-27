"use client"

import Image from "next/image"
import { Instagram, MapPin, Phone, MessageCircle } from "lucide-react"

const quickLinks = [
  { label: "Especialidades", href: "#especialidades" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
  { label: "Perguntas Frequentes", href: "#faq" },
]

const schedule = [
  { day: "Segunda-Feira", hours: "09h às 18h", closed: false },
  { day: "Terça-Feira",   hours: "09h às 18h", closed: false },
  { day: "Quarta-Feira",  hours: "09h às 18h", closed: false },
  { day: "Quinta-Feira",  hours: "09h às 18h", closed: false },
  { day: "Sexta-Feira",   hours: "09h às 18h", closed: false },
  { day: "Sábado",        hours: "Fechado",    closed: true  },
  { day: "Domingo",       hours: "Fechado",    closed: true  },
]

export function Footer() {
  return (
    <footer className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Grid principal — 4 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-5">
            <Image
              src="/LOGO%20V2%20TAIN%C3%83.png"
              alt="Dra. Tainã Aci - Endocrinologia e Metabologia Nutrologia"
              width={280}
              height={70}
              className="h-16 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/80">
              Endocrinologista na Vila Mariana especializada em emagrecimento,
              tratamento hormonal e saúde metabólica. Atendimento humanizado e personalizado.
            </p>
            <p className="text-xs text-white/50">
              CRM: 166519 | RQE: 81061
            </p>
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

          {/* Coluna 3: Contato */}
          <div>
            <h3 className="font-semibold text-base mb-5">Contato</h3>
            <div className="space-y-4">
              <a
                href="https://www.google.com/maps/place/Dra.+Tain%C3%A3+Aci/data=!4m2!3m1!1s0x0:0xe19524e5e4d5f9b3?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors leading-relaxed group"
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/50 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span>
                  Torre Paris — R. Domingos de Morais, 2187<br />
                  CJ 405 · Vila Mariana<br />
                  São Paulo — SP, 04035-000
                </span>
              </a>

              <a
                href="tel:+5511951515103"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-white/50 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span>(11) 95151-5103</span>
              </a>

              <a
                href="https://wa.me/5511951515103"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-white/50 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span>(11) 95151-5103 (WhatsApp)</span>
              </a>

              <a
                href="https://www.instagram.com/taina.aci/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <Instagram className="w-4 h-4 flex-shrink-0 text-white/50 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <span>@taina.aci</span>
              </a>
            </div>
          </div>

          {/* Coluna 4: Horário */}
          <div>
            <h3 className="font-semibold text-base mb-5">Horário de Funcionamento</h3>
            <div className="space-y-2.5">
              {schedule.map(({ day, hours, closed }) => (
                <div key={day} className="flex items-center justify-between text-sm gap-4">
                  <span className={closed ? "text-white/40" : "text-white/80"}>{day}</span>
                  <span className={closed ? "text-white/30" : "text-white/70 tabular-nums"}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Ícone Instagram */}
            <a
              href="https://www.instagram.com/taina.aci/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </a>

            {/* Copyright */}
            <p className="text-sm text-white/60 text-center order-last md:order-none">
              © {new Date().getFullYear()} Dra. Tainã Aci — Todos os direitos reservados
            </p>

            {/* P12 */}
            <p className="text-xs text-white/40">
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

      </div>
    </footer>
  )
}
