"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app, db } from '@/app/firebase';
import Layout from '../components/Layout';

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<{ name: string; bio: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        const q = query(collection(db, 'users'), where('id', '==', id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setProfile({ name: userData.name, bio: userData.bio });
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
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">ユーザープロフィール</h1>
        {profile ? (
          <>
            <p>表示名: {profile.name}</p>
            <p>自己紹介: {profile.bio || '情報がありません'}</p>
          </>
        ) : (
          <p>プロフィールが見つかりません。</p>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;