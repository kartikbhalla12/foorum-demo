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
      <div key={id} className="mx-auto w-full max-w-xl rounded-3xl bg-neutral-100 p-2">
        <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2.5 md:p-3">
          <div className="flex items-center gap-2">
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.name} className="h-8 w-8 rounded-lg md:h-10 md:w-10" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 md:h-10 md:w-10">
                <img src={userImage} alt={user.name} className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            )}
            <div className="flex flex-col items-start">
              <h3 className="text-xs font-bold text-black md:text-sm">{user.name}</h3>
              <p className="text-[10px] text-gray-500 md:text-xs">{timeDiff}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex w-8 shrink-0 justify-center md:w-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 md:h-8 md:w-8">
                <span className="text-base md:text-lg">{emoji}</span>
              </div>
            </div>
            <p className="text-left text-xs font-medium text-neutral-800 md:text-sm">{content}</p>
          </div>
        </div>
        <div className="flex gap-5 px-3 pt-2 pb-1.5 select-none md:gap-7 md:px-4 md:pt-3 md:pb-2">
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={heart} alt="like" className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={comment} alt="comment" className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            className="cursor-pointer text-gray-500 transition hover:opacity-70"
            onClick={handleToggleNotImplementedPopup}
          >
            <img src={share} alt="share" className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
      <NotImplementedPopup isOpen={isNotImplementedPopupOpen} handleClose={handleToggleNotImplementedPopup} />
      <AuthPopup isOpen={isLoggedInPopupOpen} handleClose={handleToggleLoggedInPopup} />
    </>
  );
};

export default Post;
