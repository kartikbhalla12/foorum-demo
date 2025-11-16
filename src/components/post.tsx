import { formatDistanceToNow } from 'date-fns';

import type { PostResponse } from '@/interfaces/posts.interface';

import comment from '@/assets/comment.svg';
import heart from '@/assets/heart.svg';
import share from '@/assets/share.svg';
import NotImplementedPopup from './NotImplementedPopup';
import { useCallback, useState } from 'react';
import AuthPopup from './AuthPopup';
import useUserStore from '@/store/useUserStore';
import userImage from '@/assets/user.svg';

const Post = ({ id, postedAt, content, user, emoji }: PostResponse) => {
  const timeDiff = formatDistanceToNow(postedAt, { addSuffix: true });

  const [isNotImplementedPopupOpen, setIsNotImplementedPopupOpen] = useState(false);
  const [isLoggedInPopupOpen, setIsLoggedInPopupOpen] = useState(false);

  const { isAuthenticated } = useUserStore();

  const handleToggleLoggedInPopup = useCallback(() => {
    setIsLoggedInPopupOpen((prev) => !prev);
  }, [setIsLoggedInPopupOpen]);

  const handleToggleNotImplementedPopup = useCallback(() => {
    if (!isAuthenticated) return handleToggleLoggedInPopup();
    setIsNotImplementedPopupOpen((prev) => !prev);
  }, [setIsNotImplementedPopupOpen, isAuthenticated, handleToggleLoggedInPopup]);

  return (
    <>
      <div key={id} className="w-xl rounded-3xl bg-neutral-100 p-2">
        <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-3">
          <div className="flex items-center gap-2">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} className="h-10 w-10 rounded-lg" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                <img src={userImage} alt={user.name} className="h-5 w-5" />
              </div>
            )}
            <div className="flex flex-col items-start">
              <h3 className="text-sm font-bold text-black">{user.name}</h3>
              <p className="text-xs text-gray-500">{timeDiff}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex w-10 shrink-0 justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                <span className="text-lg">{emoji}</span>
              </div>
            </div>
            <p className="text-left text-sm font-medium text-neutral-800">{content}</p>
          </div>
        </div>
        <div className="flex gap-7 px-4 pt-3 pb-2 select-none">
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={heart} alt="like" />
          </button>
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={comment} alt="comment" />
          </button>
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={share} alt="share" />
          </button>
        </div>
      </div>
      <NotImplementedPopup isOpen={isNotImplementedPopupOpen} handleClose={handleToggleNotImplementedPopup} />
      <AuthPopup isOpen={isLoggedInPopupOpen} handleClose={handleToggleLoggedInPopup} />
    </>
  );
};

export default Post;
