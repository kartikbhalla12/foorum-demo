import { v4 as uuidv4 } from 'uuid';

import { getUsers } from '@/services/user.service';

import { getItemFromStorage, setItemInStorage } from '@/utils/storage.utils';

import { STORAGE_KEYS } from '@/constants/storage';

import posts from '@/data/posts';

import type { CreatePost, Post, PostResponse } from '@/interfaces/posts.interface';

export const createPost = (post: CreatePost) => {
  // TODO - Integrate Backend API

  const newPost = {
    id: uuidv4(),
    postedAt: new Date().toISOString(),
    ...post,
  };

  const storedPosts = getItemFromStorage<Post[]>(STORAGE_KEYS.POSTS);
  const updatedPosts = [newPost, ...(storedPosts || [])];
  setItemInStorage(STORAGE_KEYS.POSTS, updatedPosts);

  return newPost;
};

export const getPosts = (): PostResponse[] => {
  // TODO - Integrate Backend API

  let storedPosts = getItemFromStorage<Post[]>(STORAGE_KEYS.POSTS) || [];

  if (!storedPosts.length) {
    setItemInStorage(STORAGE_KEYS.POSTS, posts);
    storedPosts = posts;
  }

  const users = getUsers();

  const postList = storedPosts.reduce((acc, post) => {
    const user = users.find((user) => user.id === post.userId);
    if (!user) return acc;

    acc.push({ ...post, user });
    return acc;
  }, [] as PostResponse[]);

  return postList;
};
