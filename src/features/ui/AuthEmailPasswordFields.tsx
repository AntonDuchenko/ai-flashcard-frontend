import type { AuthFormValues } from '@/entities/auth/model/auth.schema';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import type { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<AuthFormValues>;
  isSignUp?: boolean;
};

export const AuthEmailPasswordFields = ({ form, isSignUp }: Props) => (
  <div className="grid gap-6">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="m@example.com" type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            {!isSignUp && (
              <a href="/forgot-password" className="text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            )}
          </div>
          <FormControl>
            <Input type="password" placeholder="Password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
