// src/app/layout.tsx
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Header />
        <Sidebar />
        <main className="ml-64 pt-16 p-4 mx-2 my-2">{children}</main>
      </body>
    </html>
  )
}
