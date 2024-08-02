"use client"
import React, { useState, useEffect } from "react"
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBars,
} from "react-icons/fa"
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
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpen }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
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
      console.error("ソーシャル認証エラー:", error)
      setError(error.message)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error: any) {
      console.error("ログアウトエラー: ", error)
    }
  }

  const menuItems = [
    { icon: FaHome, text: "ホーム", href: "/" },
    { icon: FaCog, text: "設定", href: "/settings" },
  ]

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + "..."
  }

  const displayName = user
    ? truncateString(user.displayName || user.email || "ユーザー", 15)
    : ""

  return (
    <>
      <button
        onClick={onOpen}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-full"
      >
        <FaBars size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="検索..."
              className="w-full p-2 pl-10 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {user ? (
          <Link href={`/pf/${user.uid}`} className="block px-4 py-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="ユーザープロフィール"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-300" size={20} />
                )}
              </div>
              <span className="text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
                {displayName}
              </span>
            </div>
          </Link>
        ) : (
          <div className="px-4 mb-4">
            <button
              onClick={openModal}
              className="w-full bg-blue-500 text-white p-2 rounded text-center"
            >
              ログイン / 新規登録
            </button>
          </div>
        )}

        <nav className="flex-grow">
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

        {user && (
          <button
            onClick={handleSignOut}
            className="px-4 py-3 mb-4 bg-red-500 text-white rounded mx-4"
          >
            <FaSignOutAlt className="inline-block mr-2" />
            ログアウト
          </button>
        )}
      </aside>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {isLogin ? "ログイン" : "新規登録"}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                className="w-full p-2 border rounded text-gray-800"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full p-2 border rounded text-gray-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                {isLogin ? "ログイン" : "登録"}
              </button>
            </form>
            <div className="mt-4">
              <button
                onClick={() => handleSocialAuth(new GoogleAuthProvider())}
                className="w-full bg-red-500 text-white p-2 rounded mt-2"
              >
                Googleでログイン
              </button>
              <button
                onClick={() => handleSocialAuth(new TwitterAuthProvider())}
                className="w-full bg-blue-400 text-white p-2 rounded mt-2"
              >
                Twitterでログイン
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <p className="mt-4 text-center text-gray-800">
              {isLogin
                ? "アカウントをお持ちでないですか？ "
                : "すでにアカウントをお持ちですか？ "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500"
              >
                {isLogin ? "新規登録" : "ログイン"}
              </button>
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-gray-500 text-white p-2 rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
