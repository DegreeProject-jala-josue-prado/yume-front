import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiShoppingCart,
  HiShoppingBag,
  HiArchive,
  HiChartBar,
  HiUserGroup,
  HiTruck,
  HiCollection,
} from 'react-icons/hi';

interface SubItem {
  title: string;
  to: string;
  icon: React.ElementType;
}

interface MenuItem {
  key: string;
  title: string;
  icon: React.ElementType;
  to: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  {
    key: 'ventas',
    title: 'Ventas',
    icon: HiShoppingCart,
    to: 'sales', 
    subItems: [
      { title: 'Clientes', to: 'clients', icon: HiUserGroup },
      { title: 'Tipos de Madera', to: 'wood-types', icon: HiCollection },
    ],
  },
  {
    key: 'compras',
    title: 'Compras',
    icon: HiShoppingBag,
    to: 'purchase', 
    subItems: [
      { title: 'Proveedores', to: 'providers', icon: HiUserGroup },
      { title: 'Transporte', to: 'transport', icon: HiTruck },
    ],
  },
  {
    key: 'stock',
    title: 'Existencias',
    icon: HiArchive,
    to: 'stock',
  },
  {
    key: 'reportes',
    title: 'Reportes',
    icon: HiChartBar,
    to: 'reports',
  },
];

const Sidebar: React.FC = () => {

  const mainLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-gray-700 hover:bg-blue-100 
    ${isActive ? 'bg-blue-200 text-blue-800 font-bold' : 'font-semibold'}`;
    
  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full p-2 rounded-md text-sm transition-colors text-gray-600 hover:bg-gray-100
    ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : ''}`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 h-full">
      <nav className="flex flex-col">
        {menuItems.map((item, index) => (
          <div key={item.key}>
            {index > 0 && <hr className="my-3 border-gray-200" />}

            <NavLink to={item.to} className={mainLinkClass} end>
              <item.icon className="h-6 w-6" />
              <span>{item.title}</span>
            </NavLink>

            {item.subItems && (
              <div className="mt-2 pl-5 flex flex-col gap-1">
                {item.subItems.map((sub) => (
                  <NavLink key={sub.to} to={sub.to} className={subLinkClass}>
                    <sub.icon className="h-4 w-4" />
                    <span>{sub.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
