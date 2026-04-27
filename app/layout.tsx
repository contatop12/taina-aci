import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  icons: {
    icon: '/FAV%20ICON%20TAINA%20V1.png',
    shortcut: '/FAV%20ICON%20TAINA%20V1.png',
    apple: '/FAV%20ICON%20TAINA%20V1.png',
  },
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
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MX88GNQ9');`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MX88GNQ9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
