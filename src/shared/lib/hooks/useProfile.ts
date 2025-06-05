import { instance } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';

const fetchProfile = async () => {
  const { data } = await instance.get('/users/profile');
  return data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
};
