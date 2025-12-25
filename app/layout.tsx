import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Kenneth Hendricks | Portfolio",
  description: "Web Developer & Designer portfolio showcasing projects and skills",
  // Basic metadata
  applicationName: 'Kenneth Hendricks Portfolio',
  authors: [{ name: 'Kenneth Hendricks' }],
  generator: 'Next.js',
  keywords: ['portfolio', 'web development', 'frontend', 'developer', 'designer', 'Kenneth Hendricks'],
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    url: 'https://www.kenhendricks.me/',
    title: 'Kenneth Hendricks | Portfolio',
    description: 'Web Developer & Designer portfolio showcasing projects and skills',
    siteName: 'Kenneth Hendricks Portfolio',
    images: [
      {
        url: 'https://www.kenhendricks.me/images/social-banner.png',
        width: 1280,
        height: 640,
        alt: 'Kenneth Hendricks Portfolio',
      },
    ],
  },
  
  // Twitter-specific metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Kenneth Hendricks | Portfolio',
    description: 'Web Developer & Designer portfolio showcasing projects and skills',
    images: ['https://www.kenhendricks.me/images/social-banner.png'],
  },
  
  // Icons
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'icon', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'manifest', url: '/site.webmanifest' }
  ],
  other: {
    'darkreader-lock': 'true',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-[var(--color-background)] text-[var(--color-foreground)]`}>
        {children}
      </body>
    </html>
  )
}