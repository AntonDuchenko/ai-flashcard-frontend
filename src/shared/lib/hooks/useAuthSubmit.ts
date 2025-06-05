import type { AuthFormValues } from '@/entities/auth/model/auth.schema';
import { instance } from '@/shared/api/instance';
import type { UseFormReturn } from 'react-hook-form';

interface UseAuthSubmitOptions {
  apiPath: string;
  onSuccess?: (tokens: { accessToken: string; refreshToken: string }) => void;
}

export const useAuthSubmit = (
  form: UseFormReturn<AuthFormValues>,
  { apiPath, onSuccess }: UseAuthSubmitOptions,
) => {
  const onSubmit = async (data: AuthFormValues) => {
    try {
      const response = await instance.post(apiPath, data);

      onSuccess?.(response.data);
    } catch (error) {
      console.error('Auth error:', error);

      form.setError('email', {
        type: 'server',
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return { onSubmit };
};
