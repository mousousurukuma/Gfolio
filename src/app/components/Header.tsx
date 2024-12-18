"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [customId, setCustomId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCustomId(docSnap.data().id);
        }
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const handleLogin = async (provider: 'google' | 'twitter') => {
    const providerInstance = provider === 'google' ? new GoogleAuthProvider() : new TwitterAuthProvider();
    try {
      await signInWithPopup(auth, providerInstance);
      setShowModal(false); // モーダルを閉じる
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogout(false); // ログアウトボタンを非表示
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <header className="bg-gray-900 p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="text-white text-lg font-bold flex-1">
        <Link href="/">Gfolio</Link>
      </div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="w-1/2 p-1 rounded bg-gray-800 text-white"
        />
      </div>
      <div className="flex items-center space-x-3 flex-1 justify-end">
        {!user ? (
          <>
            <button onClick={() => setShowModal(true)} className="text-white">Login</button>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h2 className="text-lg font-bold mb-4">ログイン方法を選択</h2>
                  <button onClick={() => handleLogin('google')} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Googleでログイン</button>
                  <button onClick={() => handleLogin('twitter')} className="block w-full p-2 bg-blue-400 text-white rounded">Twitterでログイン</button>
                  <button onClick={() => setShowModal(false)} className="mt-4 text-gray-500">キャンセル</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            />
            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">Logout</button>
              </div>
            )}
          </div>
        )}
        {user && customId && (
          <Link href={`/p/${customId}`} className="text-white">My Page</Link>
        )}
      </div>
    </header>
  );
};

export default Header;