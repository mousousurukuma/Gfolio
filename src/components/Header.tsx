"use client"

import React, { useState, useEffect, useRef } from "react"
import { FaBars, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa"
import Link from "next/link"
import { auth, db } from "../utils/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signOut,
  User,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setError("")
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
        })
      }
      closeModal()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleSocialAuth = async (
    provider: GoogleAuthProvider | TwitterAuthProvider
  ) => {
    try {
      const result = await signInWithPopup(auth, provider)
      if (result.user) {
        const userRef = doc(db, "users", result.user.uid)
        await setDoc(
          userRef,
          {
            email: result.user.email,
            createdAt: new Date(),
          },
          { merge: true }
        )
      }
      closeModal()
    } catch (error: any) {
      console.error("Social auth error:", error)
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setIsDropdownOpen(false)
    } catch (error: any) {
      console.error("Error signing out: ", error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 z-30 shadow-lg">
      <div className="flex items-center">
        <button
          className="text-white mr-4 md:hidden focus:outline-none"
          onClick={onMenuClick}
        >
          <FaBars size={24} />
        </button>
        <Link href="/">
          <div className="flex items-center text-white cursor-pointer">
            <span className="text-xl font-bold">Gfolio</span>
          </div>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center mx-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="w-10 h-10 bg-gray-600 rounded-full cursor-pointer overflow-hidden flex items-center justify-center"
          onClick={user ? () => setIsDropdownOpen(!isDropdownOpen) : openModal}
        >
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser className="text-gray-300" size={20} />
          )}
        </div>

        {isDropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <p className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
              {user.displayName || user.email}
            </p>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <div className="mt-4">
              <button
                onClick={() => handleSocialAuth(new GoogleAuthProvider())}
                className="w-full bg-red-500 text-white p-2 rounded mt-2"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => handleSocialAuth(new TwitterAuthProvider())}
                className="w-full bg-blue-400 text-white p-2 rounded mt-2"
              >
                Sign in with Twitter
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-4 text-center">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-300 text-gray-800 p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
