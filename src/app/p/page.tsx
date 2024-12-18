"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '@/app/firebase';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        const db = getFirestore(app);
        const q = query(collection(db, 'users'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setBio(userData.bio);
        } else {
          console.log('No such document!');
        }
      }
    };

    if (typeof window !== 'undefined') {
      fetchProfile();
    }
  }, [id]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザープロフィール</h1>
      <p>ID: {id}</p>
      <p>自己紹介: {bio || '情報がありません'}</p>
    </div>
  );
};

export default UserProfile;