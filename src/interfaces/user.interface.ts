export interface CreateUser {
  name: string;
  email: string;
  password: string;
  image?: File;
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export interface User extends BaseUser {
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
