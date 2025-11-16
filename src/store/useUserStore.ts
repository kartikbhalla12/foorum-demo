import { create } from 'zustand';

import { logoutUser } from '@/utils/user.utils';

import type { BaseUser } from '@/interfaces/user.interface';

interface UserStore {
  user: BaseUser | null;
  setUser: (user: BaseUser) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user, isAuthenticated: true }),
  isAuthenticated: false,
  logout: () => {
    logoutUser();
    set({ user: null, isAuthenticated: false });
  },
}));

export default useUserStore;
