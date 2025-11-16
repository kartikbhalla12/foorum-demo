import { createBrowserRouter } from 'react-router';

import RedirectIfLoggedIn from '@/components/redirectIfLoggedIn';

import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/Signup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: (
      <RedirectIfLoggedIn>
        <LoginPage />
      </RedirectIfLoggedIn>
    ),
  },
  {
    path: '/signup',
    element: (
      <RedirectIfLoggedIn>
        <SignupPage />
      </RedirectIfLoggedIn>
    ),
  },
]);
