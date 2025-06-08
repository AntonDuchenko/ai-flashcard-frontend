import { instance } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';

const fetchInterestsList = async () => {
  const { data } = await instance.get('/interests');
  return data;
};

export const useInterests = () => {
  return useQuery({
    queryKey: ['interests'],
    queryFn: fetchInterestsList,
  });
};
