"use client"

import { ReactNode, useState } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="transition-all duration-300 ease-in-out pt-16 md:pl-64">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  )
}
