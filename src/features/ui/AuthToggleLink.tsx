import { useNavigate } from 'react-router';

type Props = {
  isSignUp?: boolean;
};

export const AuthToggleLink = ({ isSignUp }: Props) => {
  const navigate = useNavigate();

  const toggleMode = () => {
    navigate(isSignUp ? '/sign-in' : '/sign-up');
  };

  return (
    <div className="text-center text-sm cursor-pointer">
      {!isSignUp ? "Don't have an account?" : 'Already have an account?'}{' '}
      <a onClick={toggleMode} className="underline underline-offset-4">
        {!isSignUp ? 'Sign up' : 'Sign in'}
      </a>
    </div>
  );
};
