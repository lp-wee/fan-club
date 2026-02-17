import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'JobPortal - Find Your Dream Job',
  description:
    'JobPortal is the ultimate job search platform connecting talented professionals with leading companies worldwide.',
  keywords: [
    'job search',
    'employment',
    'careers',
    'hiring',
    'recruitment',
    'job portal',
  ],
  authors: [{ name: 'JobPortal Team' }],
  creator: 'JobPortal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jobportal.com',
    siteName: 'JobPortal',
    title: 'JobPortal - Find Your Dream Job',
    description:
      'Connect with top employers and find the perfect job opportunity.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D68FD',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
