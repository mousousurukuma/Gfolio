import "./globals.css"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { ReactNode } from "react"

export const metadata = {
  title: "Gfolio",
  description: "Gfolio Portfolio and Tracker",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Sidebar />

        <Header />
        <main className="ml-64 mt-16 p-4">{children}</main>
      </body>
    </html>
  )
}
