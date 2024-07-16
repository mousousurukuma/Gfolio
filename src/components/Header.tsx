"use client"
import React, { useState, useEffect, useRef } from "react"
import { FaBars } from "react-icons/fa"
import { IoIosSearch } from "react-icons/io"
import Link from "next/link"
import Modal from "react-modal"
import { Dialog } from "@headlessui/react"
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
import Sidebar from "./Sidebar"

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
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
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center justify-between px-4 z-20">
        <div className="flex items-center">
          <button className="text-white mr-4 md:hidden" onClick={toggleSidebar}>
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
              className="w-full p-2 pl-10 rounded bg-gray-700 text-white focus:outline-none"
            />
            <IoIosSearch
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div
          className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer overflow-hidden"
          onClick={user ? () => setIsDropdownOpen(!isDropdownOpen) : openModal}
        >
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-600"></div>
          )}
        </div>

        {isDropdownOpen && user && (
          <div className="absolute right-4 top-16 w-48 bg-white rounded-md shadow-lg py-1">
            <p className="px-4 py-2 text-sm text-gray-700">
              {user.displayName || user.email}
            </p>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 text-gray-900 shadow-xl">
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                {isLogin ? "Sign In" : "Sign Up"}
              </Dialog.Title>
              <form onSubmit={handleAuth} className="mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 border rounded mb-2 text-gray-900"
                  required
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full p-2 border rounded mb-2 text-gray-900"
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
                  className="w-full bg-red-500 text-white p-2 rounded mb-2"
                >
                  Sign in with Google
                </button>
                <button
                  onClick={() => handleSocialAuth(new TwitterAuthProvider())}
                  className="w-full bg-blue-400 text-white p-2 rounded"
                >
                  Sign in with Twitter
                </button>
              </div>
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
              <p className="mt-4 text-center">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Modal>
    </>
  )
}

export default Header
