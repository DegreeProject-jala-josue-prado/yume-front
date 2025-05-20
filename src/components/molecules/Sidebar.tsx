import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navItem = 'py-3 px-4 block hover:bg-blue-100 rounded transition';
  const activeClass = 'bg-blue-200 font-bold';

  return (
    <aside className="w-48 p-4">
      <nav className="flex flex-col gap-2">
        <NavLink to="sales" className={({ isActive }) => `${navItem} ${isActive ? activeClass : ''}`}>Ventas</NavLink>
        <NavLink to="purchase" className={({ isActive }) => `${navItem} ${isActive ? activeClass : ''}`}>Compras</NavLink>
        <NavLink to="stock" className={({ isActive }) => `${navItem} ${isActive ? activeClass : ''}`}>Existencias</NavLink>
        <NavLink to="report" className={({ isActive }) => `${navItem} ${isActive ? activeClass : ''}`}>Reportes</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
