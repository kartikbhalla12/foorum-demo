import { create } from 'zustand';

import { createPost } from '@/services/post.service';
import { getUser } from '@/services/user.service';

import type { CreatePost, PostResponse } from '@/interfaces/posts.interface';

interface PostStore {
  posts: PostResponse[];
  addPost: (post: CreatePost) => void;
  setPosts: (posts: PostResponse[]) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => {
      const newPost = createPost(post);

      const user = getUser(newPost.userId);
      if (!user) return { posts: state.posts };

      const postResponse: PostResponse = { ...newPost, user };

      return { posts: [postResponse, ...state.posts] };
    }),
  setPosts: (posts) => set({ posts }),
}));

export default usePostStore;
