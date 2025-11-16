import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import useUserStore from '@/store/useUserStore';

const RedirectIfLoggedIn = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfLoggedIn;
