import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'spitxxx - Premium Adult Entertainment Videos',
    template: '%s | spitxxx'
  },
  description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
  keywords: 'adult videos, premium content, entertainment, streaming',
  authors: [{ name: 'spitxxx' }],
  creator: 'spitxxx',
  publisher: 'spitxxx',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://spitxxx.com',
    siteName: 'spitxxx',
    title: 'spitxxx - Premium Adult Entertainment Videos',
    description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'spitxxx - Premium Adult Entertainment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'spitxxx - Premium Adult Entertainment Videos',
    description: 'Watch premium adult entertainment videos featuring top stars and categories. High quality content updated daily.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'vtTXudhAaB3sA3yXVjMLwhM7GgLPW64rmMnjwvyoQ9k',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "spitxxx",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://spitxxx.com",
              "description": "Premium adult entertainment videos featuring top stars and categories",
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://spitxxx.com"}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  )
}
