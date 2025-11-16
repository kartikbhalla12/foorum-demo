import { useNavigate } from 'react-router';
import { useCallback, useMemo } from 'react';

import useUserStore from '@/store/useUserStore';

import login from '@/assets/login.svg';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <button className="flex cursor-pointer items-center gap-2" onClick={handleLogin}>
      <p className="text-sm font-medium">Login</p>
      <img src={login} alt="login" />
    </button>
  );
};

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <button className="flex cursor-pointer items-center gap-2" onClick={handleBackToHome}>
      <p className="text-sm font-medium">Back to Home</p>
    </button>
  );
};

const LogoutButton = () => {
  const { user, logout } = useUserStore();

  return (
    <p className="cursor-pointer text-sm font-medium" onClick={logout}>
      Hi {user?.name}, Logout?
    </p>
  );
};

interface GetRightComponentProps {
  showBackToHome: boolean;
  isAuthenticated: boolean;
}
const getRightComponent = ({ showBackToHome, isAuthenticated }: GetRightComponentProps) => {
  if (showBackToHome) return <BackToHomeButton />;
  if (!isAuthenticated) return <LoginButton />;

  return <LogoutButton />;
};

interface HeaderProps {
  showBackToHome?: boolean;
}
const Header = ({ showBackToHome = false }: HeaderProps) => {
  const { isAuthenticated } = useUserStore();

  const rightComponent = useMemo(
    () =>
      getRightComponent({
        showBackToHome,
        isAuthenticated,
      }),
    [showBackToHome, isAuthenticated]
  );

  return (
    <div className="flex items-center justify-between px-4 pb-4 md:px-8 md:pb-8">
      <div className="flex items-center gap-2">
        <img src={'/logo.svg'} alt="logo" />
        <p className="text-base font-bold">foo-rum</p>
      </div>

      {rightComponent}
    </div>
  );
};

export default Header;
