// src/components/Header.tsx
"use client"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full flex items-center justify-between p-2 z-50 transition ${
        isScrolled ? "bg-transparent" : "bg-gray-900"
      }`}
    >
      <Link href="/" className="text-white text-xl font-bold">
        Gfolio.jp
      </Link>
      <div className="flex-grow mx-2 max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded"
        />
      </div>
      <div className="text-white">
        <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
      </div>
    </header>
  )
}

export default Header
