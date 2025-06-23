import { instance } from '@/shared/api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sendAnswers = async (
  body: { englishWord: string; answersStatus: boolean; answerTime: number }[],
) => {
  const { data } = await instance.post('/users/set-answers', body);
  return data;
};

export const useSendAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendAnswers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] });
    },
  });
};
