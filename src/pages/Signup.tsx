import Header from '@/components/header';
import Signup from '@/components/signup';

const SignupPage = () => {
  return (
    <div>
      <Header showBackToHome />
      <div className="mt-4 flex grow flex-col items-center">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
