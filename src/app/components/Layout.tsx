import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="ml-64 mt-12 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout; 