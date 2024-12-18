"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../firebase';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bio, setBio] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        const db = getFirestore(app);
        const docRef = doc(db, 'users', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBio(docSnap.data().bio);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchProfile();
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