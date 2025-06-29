import type { Deck } from '@/entities/deck/model/types';
import { instance } from '@/shared/api/instance';
import { useQuery } from '@tanstack/react-query';

const fetchDecks = async () => {
  const { data } = await instance.get<Deck[]>('/deck');
  return data;
};

export const useDecks = () => {
  return useQuery<Deck[]>({
    queryKey: ['decks'],
    queryFn: fetchDecks,
  });
};
