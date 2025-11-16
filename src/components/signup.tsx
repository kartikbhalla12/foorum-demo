import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import login from '@/assets/login.svg';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { createUser } from '@/services/user.service';
import useUserStore from '@/store/useUserStore';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    repeatPassword: z.string().min(1, { message: 'Password confirmation is required' }),
    image: z
      .any()
      .refine((files) => !files?.[0] || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine(
        (files) => !files?.[0] || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      ),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type FormSchema = z.infer<typeof formSchema>;

interface SignupProps {
  onLoginPress?: () => void;
  onSuccess?: () => void;
}

const Signup = ({ onLoginPress, onSuccess }: SignupProps) => {
  const navigate = useNavigate();
  const handleSignin = useCallback(() => {
    if (onLoginPress) onLoginPress();
    else navigate('/login');
  }, [navigate, onLoginPress]);

  const [signupError, setSignupError] = useState<string | null>(null);

  const { setUser } = useUserStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      image: null,
    },
  });

  const onSubmit = useCallback(
    async (data: FormSchema) => {
      const user = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image?.[0],
      });
      if (!user) return setSignupError('Account already exists or something went wrong');

      setUser(user);

      if (onSuccess) onSuccess();
    },
    [setUser, onSuccess]
  );

  const watchImage = useWatch({ control: form.control, name: 'image' })?.[0]?.name;

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-neutral-100 p-2 md:w-xl">
      <div className="flex flex-col gap-8 rounded-2xl border border-neutral-200 bg-white pt-6 pb-8 md:gap-12 md:pt-8 md:pb-16">
        <div className="flex flex-col items-center gap-2 px-4">
          <div className="mb-4 flex h-12 w-12 items-center rounded-full bg-neutral-100 md:mb-5 md:h-14 md:w-14">
            <img src={login} alt="login" className="ml-3 h-4 w-4 md:ml-4 md:h-5 md:w-5" />
          </div>
          <h2 className="text-center text-lg font-bold text-neutral-800 md:text-xl">Create an account to continue</h2>
          <p className="px-2 text-center text-xs font-medium text-neutral-600 md:text-sm">
            Create an account to access all the features on this app
          </p>
        </div>

        <div className="mx-4 md:mx-12">
          <form className="flex flex-col justify-between gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-left text-sm font-bold text-neutral-800">
                Name
              </label>
              <input
                className={`rounded-md border bg-neutral-100 p-2.5 text-sm md:p-2 md:text-base ${form.formState.errors.name ? 'border-red-500' : 'border-none'}`}
                type="text"
                placeholder="Name"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 md:text-sm">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-left text-sm font-bold text-neutral-800">
                Email
              </label>
              <input
                className={`rounded-md border bg-neutral-100 p-2.5 text-sm md:p-2 md:text-base ${form.formState.errors.email ? 'border-red-500' : 'border-none'}`}
                type="email"
                placeholder="Email"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-red-500 md:text-sm">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-left text-sm font-bold text-neutral-800">
                Password
              </label>
              <input
                className={`rounded-md border bg-neutral-100 p-2.5 text-sm md:p-2 md:text-base ${form.formState.errors.password ? 'border-red-500' : 'border-none'}`}
                type="password"
                placeholder="Password"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-red-500 md:text-sm">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-left text-sm font-bold text-neutral-800">
                Repeat Password
              </label>
              <input
                className={`rounded-md border bg-neutral-100 p-2.5 text-sm md:p-2 md:text-base ${form.formState.errors.repeatPassword ? 'border-red-500' : 'border-none'}`}
                type="password"
                placeholder="Password"
                {...form.register('repeatPassword')}
              />
              {form.formState.errors.repeatPassword && (
                <p className="text-xs text-red-500 md:text-sm">{form.formState.errors.repeatPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="flex flex-col gap-2">
                <p className="text-left text-sm font-bold text-neutral-800">Image</p>

                <input
                  className="hidden"
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple={false}
                  {...form.register('image')}
                />
                <div className="cursor-pointer rounded-md border-none bg-neutral-100 p-2.5 text-sm md:p-2 md:text-base">
                  {watchImage ? (
                    <p className="text-xs text-neutral-700 md:text-sm">{watchImage}</p>
                  ) : (
                    <p className="text-xs text-neutral-500 md:text-sm">Select Image</p>
                  )}
                </div>
              </label>

              {form.formState.errors.image && (
                <p className="text-xs text-red-500 md:text-sm">{form.formState.errors.image.message as string}</p>
              )}
            </div>

            <button
              className="mt-4 rounded-xl bg-indigo-600 p-3 text-sm font-medium text-white md:p-4 md:text-base"
              type="submit"
            >
              Sign up
            </button>
            {signupError && <p className="text-xs text-red-500 md:text-sm">{signupError}</p>}
          </form>
        </div>
      </div>
      <div className="px-4 pt-3 pb-2 text-center select-none md:pt-4">
        <p className="text-xs font-medium text-gray-600 md:text-sm">
          Already have an account?{' '}
          <span className="cursor-pointer text-blue-500" onClick={handleSignin}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
