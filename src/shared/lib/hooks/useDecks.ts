import { instance } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';

const fetchDecks = async () => {
  const { data } = await instance.get('/deck');
  return data;
};

export const useDecks = () => {
  return useQuery({
    queryKey: ['decks'],
    queryFn: fetchDecks,
  });
};
