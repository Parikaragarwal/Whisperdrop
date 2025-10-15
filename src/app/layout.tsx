import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import Header from "../../components/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WhisperDrop",
  description: "Each question matters. Asking is what makes us human.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-amber-50 antialiased`}
        style={{
          backgroundImage: "url('/images/library-texture-2.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Providers>
          {/* Header Space */}
          <Header></Header>

          {/* Main content */}
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>

          {/* Site-wide footer */}
          <footer className="text-center text-sm text-stone-400 py-6 border-t border-amber-800/30 bg-stone-950/40">
            <p className="flex items-center justify-center gap-2">
              <span className="text-amber-400">🕯️</span>
              Curiosity keeps the archive alive
              <span className="text-amber-400">🕯️</span>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
