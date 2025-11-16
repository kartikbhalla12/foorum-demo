import Login from '@/components/login';
import Header from '@/components/header';

const LoginPage = () => {
  return (
    <div>
      <Header showBackToHome />
      <div className="mt-16 flex grow flex-col items-center">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
