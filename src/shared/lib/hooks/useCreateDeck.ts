import { instance } from '@/shared/api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createDeck = async (body: { englishLvl: string; topic: string }) => {
  const { data } = await instance.post('/deck', body);
  return data;
};

export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDeck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });
};
