import { v4 as uuidv4 } from 'uuid';

import { getItemFromStorage, setItemInStorage } from '@/utils/storage.utils';

import users from '@/data/users';

import { STORAGE_KEYS } from '@/constants/storage';

import type { BaseUser, CreateUser, LoginUser, User } from '@/interfaces/user.interface';
import { uploadImage } from './image.service';

export const getUsers = (): User[] => {
  let storedUsers = getItemFromStorage<User[]>(STORAGE_KEYS.USERS) || [];

  if (!storedUsers.length) {
    setItemInStorage(STORAGE_KEYS.USERS, users);
    storedUsers = users;
  }

  return storedUsers;
};

export const getUser = (userId: string): User | undefined => {
  return getUsers().find((user) => user.id === userId);
};

export const getCurrentUser = (): BaseUser | null => getItemFromStorage<BaseUser>(STORAGE_KEYS.USER);

export const setCurrentUser = (user: BaseUser) => setItemInStorage<BaseUser>(STORAGE_KEYS.USER, user);

export const loginUser = ({ email, password }: LoginUser): BaseUser | null => {
  const user = getUsers().find((user) => user.email === email && user.password === password) || null;

  if (!user) return null;

  const { id, name, imageUrl } = user;

  const baseUser: BaseUser = { id, name, email, imageUrl };

  setCurrentUser(baseUser);
  return baseUser;
};

export const createUser = async (user: CreateUser) => {
  console.log(user);
  // TODO - Integrate Backend API

  const users = getUsers();
  const existingUser = users.find((u) => u.email === user.email);

  console.log(existingUser);

  if (existingUser) return null;

  const imageUrl = user.image ? await uploadImage(user.image) : undefined;

  console.log(imageUrl);

  const newUser = {
    id: uuidv4(),
    imageUrl,
    ...user,
  };

  const updatedUsers = [...users, newUser];
  setItemInStorage(STORAGE_KEYS.USERS, updatedUsers);

  const baseUser: BaseUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    imageUrl,
  };

  setCurrentUser(baseUser);
  return newUser;
};
