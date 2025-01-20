import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rezeptify",
  description: "Rezeptee",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </SessionProvider>
      </body>
    </html>
  )
}

