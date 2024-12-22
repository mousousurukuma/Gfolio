"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app, db } from '@/app/firebase';

const Header: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.id) {
              // idが存在しない場合は生成して保存
              const newId = await generateUniqueId(user.uid);
              await setDoc(docRef, { id: newId }, { merge: true });
              setUserId(newId);
            } else {
              setUserId(data.id);
            }
          } else {
            // ドキュメントが存在しない場合は新規作成
            const newId = await generateUniqueId(user.uid);
            await setDoc(docRef, {
              id: newId,
              name: user.displayName || '',
              bio: ''
            });
            setUserId(newId);
          }
        } catch (error) {
          console.error('Error fetching or setting user data:', error);
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const generateUniqueId = async (uid: string): Promise<string> => {
    let uniqueId = uid.slice(0, 6);
    let isUnique = false;

    while (!isUnique) {
      const q = query(collection(db, 'users'), where('id', '==', uniqueId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        isUnique = true;
      } else {
        // 重複があった場合はランダムな値を追加
        uniqueId = uid.slice(0, 6) + Math.random().toString(36).substring(2, 3);
      }
    }

    return uniqueId;
  };

  const handleAuth = async (provider: 'google' | 'twitter') => {
    const providerInstance = provider === 'google' ? new GoogleAuthProvider() : new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, providerInstance);
      const user = result.user;
      // ユーザーが新規の場合、Firestoreにユーザーデータを保存
      // ここでユーザーの登録処理を行う
    } catch (error) {
      console.error('認証エラー:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <header className="bg-gray-900 p-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="text-white text-lg font-bold flex-1">
        <Link href="/">Gfolio</Link>
      </div>
      <div className="flex items-center space-x-3 flex-1 justify-end">
        {!user ? (
          <>
            <button onClick={() => setShowAuthModal(true)} className="text-white">登録/ログイン</button>
            {showAuthModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg">
                  <h2 className="text-lg font-bold mb-4">登録/ログイン</h2>
                  <button onClick={() => handleAuth('google')} className="block w-full mb-2 p-2 bg-blue-500 text-white rounded">Googleで続行</button>
                  <button onClick={() => handleAuth('twitter')} className="block w-full p-2 bg-blue-400 text-white rounded">Twitterで続行</button>
                  <button onClick={() => setShowAuthModal(false)} className="mt-4 text-gray-500">キャンセル</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {userId && (
              <Link href={`/${userId}`} className="text-white">マイページ</Link>
            )}
            <Link href={`/edit`} className="text-white">プロフィール編集</Link>
            <button onClick={handleLogout} className="text-white">ログアウト</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;