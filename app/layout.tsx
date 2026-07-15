import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import './globals.css'
import { PageviewTracker } from '@/components/pageview-tracker'
import { CookieBanner } from '@/components/CookieBanner'
import { CRITICAL_PRELOADS, MEDIA_CDN } from '@/lib/media'
import { META_PIXEL_ID } from '@/lib/tracking'

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
  keywords: 'endocrinologista, Vila Mariana, São Paulo, emagrecimento, hormônios, tireoide, diabetes, menopausa, caneta emagrecedora',
  icons: {
    icon: [
      { url: 'https://tainaaci.com.br/favicon.png', type: 'image/png', sizes: '144x144' },
    ],
    shortcut: 'https://tainaaci.com.br/favicon.png',
    apple: 'https://tainaaci.com.br/favicon.png',
  },
  other: {
    'facebook-domain-verification': 'r3puut6a1stg0tccn5v972ti5j2kpk',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#6B7F5E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} bg-background scroll-smooth`}
    >
      <head>
        <meta name="facebook-domain-verification" content="4yad41aniydcacq7jndnwbxujtr44t" />
        {/* Pré-conexão com Google Tag Manager e Google Analytics para reduzir latência */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href={MEDIA_CDN} crossOrigin="" />
        <link rel="dns-prefetch" href={MEDIA_CDN} />
        {CRITICAL_PRELOADS.map(({ href, as }) => (
          <link key={href} rel="preload" href={href} as={as} type="image/webp" />
        ))}
        <link
          rel="preload"
          as="script"
          href="https://www.googletagmanager.com/gtm.js?id=GTM-MX88GNQ9"
        />

        {/* Inicializa dataLayer o mais cedo possível para que qualquer push antes do GTM seja preservado */}
        <Script id="datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>

        {/* GTM container — carregado o mais cedo possível em todas as rotas */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MX88GNQ9');`}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
        </Script>
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MX88GNQ9"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
