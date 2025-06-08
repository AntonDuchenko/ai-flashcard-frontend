'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormSchema } from '@/entities/auth/model/auth.schema';
import { useAuthSubmit } from '@/shared/lib/hooks/useAuthSubmit';
import { Form } from '@/shared/ui/form';
import { Button } from '@/shared/ui/button';
import { LogIn } from 'lucide-react';
import { AuthEmailPasswordFields } from './AuthEmailPasswordFields';
import { AuthToggleLink } from './AuthToggleLink';
import { useLocation } from 'react-router';

export const AuthForm = () => {
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: { email: '', password: '' },
  });
  const pathname = useLocation().pathname;
  const isSignUp = pathname === '/sign-up';

  const { onSubmit } = useAuthSubmit(form, {
    apiPath: isSignUp ? '/auth/register' : '/auth/login',
    onSuccess: () => {
      window.location.href = isSignUp ? '/complete-registration' : '/';
    },
  });

  return (
    <>
      <div className="flex items-center gap-2 self-center font-medium justify-center mb-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <LogIn />
        </div>
        {isSignUp ? 'Sign up' : 'Sign in'}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <AuthEmailPasswordFields form={form} isSignUp={isSignUp} />
          <Button type="submit" className="w-full">
            {isSignUp ? 'Sign up' : 'Sign in'}
          </Button>
          <AuthToggleLink isSignUp={isSignUp} />
        </form>
      </Form>
    </>
  );
};
