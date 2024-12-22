"use client"

import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app, db } from '@/app/firebase';
import Layout from '../components/Layout';

const Edit: React.FC = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const auth = getAuth(app);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setBio(data.bio || '');
        }
      }
    };

    fetchProfile();
  }, [auth]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          name,
          bio
        }, { merge: true });
        setMessage('プロフィールが保存されました。');
      } catch (error) {
        console.error('保存エラー:', error);
        setMessage('プロフィールの保存に失敗しました。');
      }
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">表示名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
    </Layout>
  );
};

export default Edit;