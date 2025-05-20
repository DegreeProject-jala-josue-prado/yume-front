import React from 'react';
import Header from '../molecules/Header';
import Sidebar from '../molecules/Sidebar';
import { Outlet } from 'react-router-dom';

const HomeStructure: React.FC = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen">
      {/* Header (ocupa toda la parte superior) */}
      <header className="col-span-2 bg-white shadow">
        <Header />
      </header>

      {/* Sidebar (debajo del header, solo primera columna) */}
      <aside className="row-start-2 bg-gray-200">
        <Sidebar />
      </aside>

      {/* Contenido principal (debajo del header, segunda columna) */}
      <main className="row-start-2 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeStructure;