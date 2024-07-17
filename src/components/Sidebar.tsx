"use client"
import React from "react"
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa"
import Link from "next/link"
import { auth } from "../utils/firebase"
import { signOut } from "firebase/auth"
import { usePathname } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname()

  const menuItems = [
    { icon: FaHome, text: "Home", href: "/" },
    { icon: FaUser, text: "Profile", href: "/profile" },
    { icon: FaCog, text: "Settings", href: "/settings" },
  ]

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // ログアウト後の処理（例：ホームページにリダイレクト）はクライアントサイドコンポーネントで行う必要があります
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]`}
      >
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ${
                    pathname === item.href ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  <item.icon className="mr-3" size={20} />
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200"
          >
            <FaSignOutAlt className="mr-3" size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
