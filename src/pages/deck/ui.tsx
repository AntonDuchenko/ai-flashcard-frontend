import { Flashcard } from '@/entities/flashcard/ui/FlashCard';
import { useDecks } from '@/shared/lib/hooks/useDecks';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import type { Deck } from '@/entities/deck/model/types';
import { useSendAnswers } from '@/shared/lib/hooks/useSendAnswers';
import { cn } from '@/shared/lib/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSendReapitingAnswers } from '@/shared/lib/hooks/useSendReapitingAnswers';

export const DeckPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flippedTime, setFlippedTime] = useState(Date.now());
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const answersRef = useRef<{ wordId: string; correct: boolean; answerTime: number }[]>([]);

  const { mutateAsync: sendAnswers, isPending } = useSendAnswers();
  const { mutateAsync: sendReapitingAnswers, isPending: isPendingReapiting } =
    useSendReapitingAnswers();
  const { data: decks, isLoading } = useDecks();
  const deck = decks?.find((deck: Deck) => deck.id === id);

  useEffect(() => {
    const handleKeyNextAction = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasAnswered) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyNextAction);

    return () => {
      window.removeEventListener('keydown', handleKeyNextAction);
    };
  }, [hasAnswered]);

  if (!id) return <div className="text-center mt-10">Колода не найдена</div>;
  if (isLoading || !deck) return <div className="text-center mt-10">Загрузка колоды...</div>;
  if (!deck.flashcards.length) return <div className="text-center mt-10">Колода пуста</div>;

  const current = deck.flashcards[currentIndex];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const correct = userAnswer.trim().toLowerCase() === current.word.trim().toLowerCase();
    setIsCorrect(correct);
    setFlipped(true);
    setHasAnswered(true);

    answersRef.current = [
      ...answersRef.current,
      {
        wordId: current.id,
        correct,
        answerTime: Number(((Date.now() - flippedTime) / 1000).toFixed(1)),
      },
    ];
  };

  function handleNext() {
    setFlipped(false);
    setHasAnswered(false);

    setTimeout(() => {
      if (!deck) return;

      const nextIndex = currentIndex + 1;

      if (nextIndex >= deck.flashcards.length) {
        setIsFinished(true);
        if (deck.type === 'REPEATING') {
          sendReapitingAnswers(answersRef.current);
        } else {
          sendAnswers(answersRef.current);
        }
      } else {
        setCurrentIndex(nextIndex);
        setUserAnswer('');
        setIsCorrect(null);
        setFlippedTime(Date.now());
      }
    }, 500);
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">{deck.title}</h1>

      {isFinished ? (
        <div className="text-center mt-10">
          <p className="text-xl text-green-700 font-medium mb-4">
            🎉 Поздравляем! Вы завершили колоду.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center h-[210px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-[320px]"
              >
                <Flashcard
                  word={current.translation}
                  translation={current.word}
                  isFlipped={flipped}
                  onFlip={hasAnswered ? () => setFlipped((f) => !f) : undefined}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <form
            className="mt-6 flex flex-col justify-center gap-4 items-center"
            onSubmit={handleSubmit}
          >
            <Input
              key={current.id}
              value={userAnswer}
              autoFocus
              disabled={hasAnswered}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Введи перевод..."
              className={cn(
                'px-4 py-2 rounded-xl border transition max-w-[400px]',
                isCorrect === null && 'border-gray-300',
                isCorrect === true && 'bg-green-50 border-green-500',
                isCorrect === false && 'bg-red-50 border-red-500',
              )}
            />

            <div className="flex flex-col gap-4 w-full max-w-[200px]">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
                disabled={!(isCorrect === null) || !userAnswer || isPending || isPendingReapiting}
              >
                Проверить
              </Button>

              <Button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl"
                onClick={() => {
                  setHasAnswered(true);
                  setIsCorrect(false);
                  setFlipped(true);
                }}
                disabled={!!hasAnswered || isPending}
              >
                Не знаю
              </Button>

              <Button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-xl"
                onClick={handleNext}
                isLoading={isPending}
                disabled={!hasAnswered || isPending}
              >
                Следующая
              </Button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};
