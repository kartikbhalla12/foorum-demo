import { useCallback, useEffect, useState } from 'react';
import Login from './login';
import Signup from './signup';

type AuthType = 'login' | 'signup';

interface AuthPopupProps {
  isOpen: boolean;
  handleClose: () => void;
}

const AuthPopup = ({ isOpen, handleClose }: AuthPopupProps) => {
  const [authType, setAuthType] = useState<AuthType>('login');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    },
    [isOpen, handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleStopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75" onClick={handleClose}>
      <div onClick={handleStopPropagation}>
        {authType === 'login' ? (
          <Login onSignupPress={() => setAuthType('signup')} onSuccess={handleClose} />
        ) : (
          <Signup onLoginPress={() => setAuthType('login')} onSuccess={handleClose} />
        )}
      </div>
    </div>
  );
};

export default AuthPopup;
