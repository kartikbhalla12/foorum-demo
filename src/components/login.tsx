import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import login from '@/assets/login.svg';
import useUserStore from '@/store/useUserStore';
import { loginUser } from '@/services/user.service';

const formSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormSchema = z.infer<typeof formSchema>;

interface LoginProps {
  onSignupPress?: () => void;
  onSuccess?: () => void;
}

const Login = ({ onSignupPress, onSuccess }: LoginProps) => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState<string | null>(null);

  const { setUser } = useUserStore();

  const handleSignup = useCallback(() => {
    if (onSignupPress) onSignupPress();
    else navigate('/signup');
  }, [navigate, onSignupPress]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    (data: FormSchema) => {
      const user = loginUser(data);
      if (!user) return setLoginError('Invalid email or password');

      setUser(user);

      if (onSuccess) onSuccess();
    },
    [setUser, onSuccess]
  );

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-neutral-100 p-2 md:w-xl">
      <div className="flex flex-col gap-8 rounded-2xl border border-neutral-200 bg-white pt-6 pb-8 md:gap-16 md:pt-8 md:pb-16">
        <div className="flex flex-col items-center gap-2 px-4">
          <div className="mb-4 flex h-12 w-12 items-center rounded-full bg-neutral-100 md:mb-5 md:h-14 md:w-14">
            <img src={login} alt="login" className="ml-3 h-4 w-4 md:ml-4 md:h-5 md:w-5" />
          </div>
          <h2 className="text-center text-lg font-bold text-neutral-800 md:text-xl">Sign in to continue</h2>
          <p className="px-2 text-center text-xs font-medium text-neutral-600 md:text-sm">
            Sign in to access all the features on this app
          </p>
        </div>

        <div className="mx-4 md:mx-12">
          <form className="flex flex-col justify-between gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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

            <button
              className="mt-4 rounded-xl bg-indigo-600 p-3 text-sm font-medium text-white md:p-4 md:text-base"
              type="submit"
            >
              Sign in
            </button>
            {loginError && <p className="text-xs text-red-500 md:text-sm">{loginError}</p>}
          </form>
        </div>
      </div>
      <div className="px-4 pt-3 pb-2 text-center select-none md:pt-4">
        <p className="text-xs font-medium text-gray-600 md:text-sm">
          Don't have an account?{' '}
          <span className="cursor-pointer text-blue-500" onClick={handleSignup}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
