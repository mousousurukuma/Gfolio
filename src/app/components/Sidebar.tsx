// app/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 w-64 h-full fixed top-12 left-0 overflow-y-auto p-4 hidden sm:block">
      <ul className="space-y-2">
        <li>
          <Link href="/home" className="text-white block">Home</Link>
        </li>
        <li>
          <Link href="/following" className="text-white block">Following</Link>
        </li>
        <li>
          <Link href="/channels" className="text-white block">Channels</Link>
        </li>
        <li>
          <Link href="/following" className="text-white block">Following</Link>
        </li>
        <li>
          <Link href="/channels" className="text-white block">Channels</Link>
        </li>        <li>
          <Link href="/following" className="text-white block">Following</Link>
        </li>
        <li>
          <Link href="/channels" className="text-white block">Channels</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;