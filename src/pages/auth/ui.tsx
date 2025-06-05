import { AuthForm } from '@/features/ui/AuthForm';

export const AuthPage = () => (
  <div className="bg-slate-50 h-screen flex items-center justify-center p-4">
    <div className="max-w-[400px] w-full p-8 border rounded-3xl bg-white">
      <AuthForm />
    </div>
  </div>
);
