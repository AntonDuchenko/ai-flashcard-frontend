import type { Profile } from '@/entities/profile/model/profile.schema';
import { instance } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';

const fetchProfile = async () => {
  const { data } = await instance.get<Profile>('/users/profile');
  return data;
};

export const useProfile = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
};
