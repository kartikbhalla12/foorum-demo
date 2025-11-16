import { router } from '@/utils/router.utils';

import { STORAGE_KEYS } from '@/constants/storage';

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);

  router.navigate('/');
};
