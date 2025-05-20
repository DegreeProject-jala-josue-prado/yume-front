import React from 'react';
import GoogleLogoutButton from '../atoms/GoogleLogutButton';
import { useNavigate } from 'react-router-dom';
import blogger from '../../assets/blogger.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout successful');   
    navigate('/');
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={blogger} alt="logo" className="w-8 h-8" />
        <span className="text-xl font-semibold">Yume</span>
      </div>
      <GoogleLogoutButton onLogout={handleLogout} />
    </header>
  );
};

export default Header;
