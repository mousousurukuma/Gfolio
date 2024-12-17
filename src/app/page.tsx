import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* メインコンテンツをここに追加 */}
        </main>
      </div>
    </div>
  );
}
