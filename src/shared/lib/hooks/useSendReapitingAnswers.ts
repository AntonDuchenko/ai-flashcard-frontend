import { instance } from '@/shared/api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const sendReapitingAnswers = async (body: {
  wordId: string;
  correct: boolean;
  answerTime: number;
}[]) => {
  const { data } = await instance.post('/users/set-review-answers', body);
  return data;
};

export const useSendReapitingAnswers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendReapitingAnswers,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });
};
