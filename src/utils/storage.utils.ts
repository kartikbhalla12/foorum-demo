export const getItemFromStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemInStorage = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));
