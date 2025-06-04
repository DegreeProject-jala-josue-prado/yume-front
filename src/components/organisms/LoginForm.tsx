import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from '../atoms/GoogleLoginButton';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = (response: unknown) => {
    console.log('Login successful', response);
    navigate("/home")

  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLoginButton
          onSuccess={handleLogin}
          onError={() => console.log('Login Failed')}
        />
      </GoogleOAuthProvider>
    </div>
    
  );
};
export default LoginPage;
