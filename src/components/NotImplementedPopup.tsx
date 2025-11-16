import { useCallback, useEffect } from 'react';

import settings from '@/assets/settings.svg';

interface NotImplementedPopupProps {
  isOpen: boolean;
  handleClose: () => void;
}
const NotImplementedPopup = ({ isOpen, handleClose }: NotImplementedPopupProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    },
    [isOpen, handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleStopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/75" onClick={handleClose}>
      <div className="z-50 w-lg rounded-3xl bg-neutral-100 p-2" onClick={handleStopPropagation}>
        <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 pt-8">
          <div className="gap-2x flex flex-col items-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
              <img src={settings} alt="settings" />
            </div>
          </div>
          <p className="mb-8 text-center text-sm font-medium text-neutral-800"> This feature is not implemented yet</p>
          <button className="cursor-pointer rounded-md bg-indigo-600 p-2 text-white" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotImplementedPopup;
