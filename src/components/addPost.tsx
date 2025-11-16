import { useCallback, useState } from 'react';
import emojiMartData, { type EmojiMartData } from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';

import usePostStore from '@/store/usePostStore';

import plus from '@/assets/plus.svg';
import send from '@/assets/send.svg';
import video from '@/assets/video.svg';
import microphone from '@/assets/mic.svg';
import down from '@/assets/down.svg';
import editorBold from '@/assets/editor-bold.svg';
import editorItalics from '@/assets/editor-italics.svg';
import editorUnderline from '@/assets/editor-underline.svg';
import editorUl from '@/assets/editor-ul.svg';
import editorOl from '@/assets/editor-ol.svg';
import editorCode from '@/assets/editor-code.svg';
import editorQuote from '@/assets/editor-quote.svg';
import deleteIcon from '@/assets/delete.svg';
import emojiIcon from '@/assets/emoji.svg';
import useUserStore from '@/store/useUserStore';
import NotImplementedPopup from './NotImplementedPopup';
import AuthPopup from './AuthPopup';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

const formSchema = z.object({
  content: z.string().min(1, { message: 'Post content is required' }),
  emoji: z.string().nullable().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const DEFAULT_EMOJI = (emojiMartData as EmojiMartData).emojis.smile.skins[0].native;

const AddPost = () => {
  //   const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isNotImplementedPopupOpen, setIsNotImplementedPopupOpen] = useState(false);
  const [isLoggedInPopupOpen, setIsLoggedInPopupOpen] = useState(false);

  const { addPost } = usePostStore();
  const { user, isAuthenticated } = useUserStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      emoji: null,
    },
  });

  const handleToggleLoggedInPopup = useCallback(() => {
    setIsLoggedInPopupOpen((prev) => !prev);
  }, [setIsLoggedInPopupOpen]);

  const handleToggleNotImplementedPopup = useCallback(() => {
    if (!isAuthenticated) return handleToggleLoggedInPopup();

    setIsNotImplementedPopupOpen((prev) => !prev);
  }, [setIsNotImplementedPopupOpen, isAuthenticated, handleToggleLoggedInPopup]);

  const selectedEmoji = useWatch({ control: form.control, name: 'emoji' });

  const handleSubmit = useCallback(
    async (data: FormSchema) => {
      console.log(data);
      if (!isAuthenticated) return handleToggleLoggedInPopup();

      const trimmedContent = data.content.trim();

      if (!trimmedContent) return;

      const newPost = {
        content: trimmedContent,
        emoji: selectedEmoji || DEFAULT_EMOJI,
        userId: user?.id || '',
      };

      addPost(newPost);
      form.reset();
    },
    [selectedEmoji, user?.id, addPost, isAuthenticated, handleToggleLoggedInPopup, form]
  );

  const handleEmojiSelect = useCallback(
    (emoji: { native: string }) => {
      setShowEmojiPicker(false);
      form.setValue('emoji', emoji.native);
    },
    [form, setShowEmojiPicker]
  );

  return (
    <>
      <div className="w-xl rounded-3xl bg-neutral-100 p-2">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white"
        >
          <div className="p-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-between rounded-lg bg-neutral-100 p-1">
                <div
                  className="flex w-25 cursor-pointer flex-row justify-between rounded-md bg-white p-2"
                  onClick={handleToggleNotImplementedPopup}
                >
                  <p className="text-xs font-medium text-black">Paragraph</p>
                  <img src={down} alt="down" />
                </div>

                <div className="flex flex-row gap-5 px-5">
                  <button
                    className="cursor-pointer rounded-md bg-white px-3 text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorBold} alt="editorBold" />
                  </button>

                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorItalics} alt="editorItalics" />
                  </button>

                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorUnderline} alt="editorUnderline" />
                  </button>
                </div>

                <div className="flex flex-row gap-5 border-x border-neutral-200 px-5">
                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorUl} alt="editorUl" />
                  </button>

                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorOl} alt="editorOl" />
                  </button>
                </div>
                <div className="flex flex-row gap-5 px-5">
                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorQuote} alt="editorQuote" />
                  </button>

                  <button
                    className="cursor-pointer text-gray-500 transition hover:opacity-70"
                    onClick={handleToggleNotImplementedPopup}
                    type="button"
                  >
                    <img src={editorCode} alt="editorCode" />
                  </button>
                </div>
              </div>

              <button
                className="cursor-pointer rounded-lg bg-red-100 px-3 transition hover:opacity-70"
                type="button"
                onClick={() => form.reset()}
              >
                <img src={deleteIcon} alt="deleteIcon" />
              </button>
            </div>
            <div className="flex flex-row items-start gap-2 pt-3.5">
              {selectedEmoji ? (
                <span className="cursor-pointer text-lg" onClick={() => setShowEmojiPicker(true)}>
                  {selectedEmoji}
                </span>
              ) : (
                <img
                  src={emojiIcon}
                  alt="image"
                  className="mt-1 cursor-pointer"
                  onClick={() => setShowEmojiPicker(true)}
                />
              )}

              {showEmojiPicker && (
                <>
                  <div
                    className="absolute top-0 right-0 bottom-0 left-0"
                    z-10
                    onClick={() => setShowEmojiPicker(false)}
                  />
                  <div className="absolute z-20">
                    <EmojiPicker data={emojiMartData} onEmojiSelect={handleEmojiSelect} previewPosition="none" />
                  </div>
                </>
              )}

              <div className="flex w-full flex-col gap-2">
                <textarea
                  placeholder="Add a comment"
                  className="w-full overflow-hidden outline-none"
                  rows={4}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(handleSubmit)();
                    }
                  }}
                  {...form.register('content')}
                />
                {form.formState.errors.content && (
                  <p className="text-left text-xs text-red-500">{form.formState.errors.content.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t border-neutral-200 p-2">
            <div className="flex gap-4">
              <button
                className="cursor-pointer rounded-lg bg-neutral-100 p-2 text-gray-500 transition hover:opacity-70"
                onClick={handleToggleNotImplementedPopup}
                type="button"
              >
                <img src={plus} alt="plus" />
              </button>
              <button
                className="cursor-pointer text-gray-500 transition hover:opacity-70"
                onClick={handleToggleNotImplementedPopup}
                type="button"
              >
                <img src={microphone} alt="microphone" />
              </button>
              <button
                className="cursor-pointer text-gray-500 transition hover:opacity-70"
                onClick={handleToggleNotImplementedPopup}
                type="button"
              >
                <img src={video} alt="video" />
              </button>
            </div>
            <button type="submit" className="cursor-pointer text-gray-500 transition hover:opacity-70">
              <img src={send} alt="send" />
            </button>
          </div>
        </form>
      </div>
      <NotImplementedPopup isOpen={isNotImplementedPopupOpen} handleClose={handleToggleNotImplementedPopup} />
      <AuthPopup isOpen={isLoggedInPopupOpen} handleClose={handleToggleLoggedInPopup} />
    </>
  );
};

export default AddPost;
