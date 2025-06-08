import { instance } from '@/shared/api/instance';
import { useMutation } from '@tanstack/react-query';

const completeRegistration = async (body: {
  englishLvl: string;
  interests: {
    id: string;
    name: string;
  }[];
}) => {
  const { data } = await instance.post('/users/profile/complete', body);
  return data;
};

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: completeRegistration,
  });
};
