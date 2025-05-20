import { googleLogout } from '@react-oauth/google';

interface Props {
  onLogout: () => void;
}

const GoogleLogoutButton: React.FC<Props> = ({ onLogout }) => {

  const handleClick = () => {
    googleLogout();
    onLogout();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-blue-500 border border-blue-500 rounded-md px-4 py-2 font-medium hover:bg-blue-50 transition"
    >
      Cerrar Sesion
    </button>
  );
};

export default GoogleLogoutButton;
