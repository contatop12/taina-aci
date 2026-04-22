import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dra. Tainã Aci | Endocrinologista em Vila Mariana, São Paulo',
  description: 'Endocrinologista especializada em emagrecimento, hormônios e saúde metabólica. Atendimento de alto padrão na Vila Mariana, São Paulo. CRM 166519 | RQE 81061.',
  keywords: 'endocrinologista, Vila Mariana, São Paulo, emagrecimento, hormônios, tireoide, diabetes, menopausa, Ozempic, Mounjaro',
  generator: 'v0.app',
}

export const viewport = {
  themeColor: '#6B7F5E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} bg-background scroll-smooth`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
