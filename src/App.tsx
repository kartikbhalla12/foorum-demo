import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import useUserStore from '@/store/useUserStore';

import { getCurrentUser } from '@/services/user.service';

import { router } from '@/utils/router.utils';

const App = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) setUser(user);
  }, [setUser]);

  return <RouterProvider router={router} />;
};

export default App;
