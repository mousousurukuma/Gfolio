"use client"

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/app/firebase';

const Edit: React.FC = () => {
  const [customId, setCustomId] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCustomId(data.id || '');
          setBio(data.bio || '');
        }
      }
    };

    fetchProfile();
  }, [auth, db]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // IDの重複チェック
        const q = query(collection(db, 'users'), where('id', '==', customId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty && querySnapshot.docs[0].id !== user.uid) {
          setMessage('このIDは既に使用されています。別のIDを選んでください。');
          return;
        }

        await setDoc(doc(db, 'users', user.uid), {
          id: customId,
          bio: bio
        });
        setMessage('プロフィールが保存されました。');
      } catch (error) {
        console.error('保存エラー:', error);
        setMessage('プロフィールの保存に失敗しました。');
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">マイページ</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">カスタムID</label>
        <input
          type="text"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">自己紹介文</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        保存
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default Edit;