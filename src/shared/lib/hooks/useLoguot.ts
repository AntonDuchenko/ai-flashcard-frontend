import { instance } from '@/shared/api/instance';
import { useMutation } from '@tanstack/react-query';

const logout = async () => {
  const { data } = await instance.post('/auth/logout');
  return data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = '/sign-in';
    },
  });
};
