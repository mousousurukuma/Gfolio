"use client"

import { ReactNode, useState } from "react"
import Sidebar from "@/components/Sidebar"
import { FaBars } from "react-icons/fa"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <html lang="ja">
      <body className="bg-gray-900 text-white">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-full"
          aria-label="Toggle sidebar"
        >
          <FaBars size={24} />
        </button>
        <main
          className={`transition-all duration-300 ease-in-out pt-16 ${
            isSidebarOpen ? "md:pl-64" : "md:pl-0"
          }`}
        >
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  )
}
