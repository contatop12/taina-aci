"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Check } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const objectives = [
  "Emagrecimento",
  "Hormônios e Menopausa",
  "Diabetes ou Tireoide",
  "Pós-Bariátrica",
  "Prevenção e Qualidade de Vida",
  "Outro",
]

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [objective, setObjective] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !objective || !agreed) return

    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Redirect to WhatsApp after 3 seconds
    setTimeout(() => {
      const whatsappNumber = "5511999999999" // Replace with real number
      const message = encodeURIComponent(
        `Olá! Meu nome é ${name} e gostaria de agendar uma consulta. Meu objetivo principal é: ${objective}.`
      )
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
      onClose()
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setName("")
    setPhone("")
    setObjective("")
    setAgreed(false)
    setIsSubmitted(false)
  }

  const handleClose = () => {
    onClose()
    if (isSubmitted) {
      resetForm()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-taina-aci-endocrinologista-EbAIwBI2XjhD3n9QlAL4BKoBmVz2qC.png"
            alt="Dra. Tainã Aci"
            width={140}
            height={45}
            className="h-10 w-auto mx-auto mb-4"
          />
          <h3 className="text-xl font-serif text-foreground">
            Iniciar meu acompanhamento
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Preencha seus dados e nossa equipe entrará em contato pelo WhatsApp imediatamente para iniciar o atendimento.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Perfeito!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Nossa equipe já foi notificada e entrará em contato em instantes. Fique de olho no seu WhatsApp! 📱
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <div>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full"
                required
              />
            </div>

            <div>
              <Select value={objective} onValueChange={setObjective} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Qual seu principal objetivo?" />
                </SelectTrigger>
                <SelectContent>
                  {objectives.map((obj) => (
                    <SelectItem key={obj} value={obj}>
                      {obj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <Label htmlFor="agree" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                Autorizo o uso dos meus dados para contato, conforme a política de privacidade.
              </Label>
            </div>

            <CTAButton
              type="submit"
              disabled={!name || !phone || !objective || !agreed || isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Enviando..." : "Falar com a equipe agora"}
            </CTAButton>

            <p className="text-xs text-center text-muted-foreground">
              Você será atendido em instantes pelo WhatsApp
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
