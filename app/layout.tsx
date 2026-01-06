import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuraNavbar } from "@/components/aura-navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Providers } from "@/components/providers"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "arial"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Aura House of Flowers | Curated Artificial Floral Décor",
  description:
    "Premium distributor of curated artificial floral décor and botanical elements for modern interiors. Recognized for quality since 2008.",
  keywords: [
    "artificial flowers",
    "luxury décor",
    "interior design botanical",
    "botanical elements",
    "Aura House of Flowers",
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "Aura House of Flowers",
    description: "Where nature meets considered design.",
    url: "https://auraflowers.com",
    siteName: "Aura House of Flowers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <Providers>
          <AuraNavbar />
          {children}
          <WhatsAppFloat />
          {/* <Analytics /> */}
        </Providers>
      </body>
    </html>
  )
}
