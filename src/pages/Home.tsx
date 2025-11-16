import { useEffect } from 'react';

import Post from '@/components/post';
import { getPosts } from '@/services/post.service';
import AddPost from '@/components/addPost';
import usePostStore from '@/store/usePostStore';
import Header from '@/components/header';

import '@/index.css';

const Home = () => {
  const { posts, setPosts } = usePostStore();

  useEffect(() => {
    setPosts(getPosts());
  }, [setPosts]);

  return (
    <div>
      <Header />

      <div className="mx-auto mt-12 max-w-xl">
        <div className="mb-4">
          <AddPost />
        </div>

        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
