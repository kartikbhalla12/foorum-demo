import type { BaseUser } from "@/interfaces/user.interface";

export interface Post {
  id: string;
  postedAt: string;
  content: string;
  userId: string;
  emoji?: string;
}

export interface CreatePost {
  content: string;
  userId: string;
  emoji?: string;
}


export interface PostResponse  {
  id: string;
  postedAt: string;
  content: string;
  user: BaseUser;
  emoji?: string;
}