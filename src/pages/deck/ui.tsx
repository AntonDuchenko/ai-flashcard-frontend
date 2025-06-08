import { Flashcard } from '@/entities/flashcard/ui/FlashCard';
import { useDecks } from '@/shared/lib/hooks/useDecks';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import clsx from 'clsx';
import type { Deck } from '@/entities/deck/model/types';
import { useSendAnswers } from '@/shared/lib/hooks/useSendAnswers';

export const DeckPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const answersRef = useRef<{ englishWord: string; answersStatus: boolean }[]>([]);

  const { mutateAsync: sendAnswers } = useSendAnswers();
  const { data: decks, isLoading } = useDecks();
  const deck = decks?.find((deck: Deck) => deck.id === id);

  if (!id) return <div className="text-center mt-10">Deck not found</div>;
  if (isLoading || !deck) return <div className="text-center mt-10">Завантаження...</div>;
  if (!deck.flashcards.length)
    return <div className="text-center mt-10">У цій колоді немає карток</div>;

  const current = deck.flashcards[currentIndex];

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === current.translation.trim().toLowerCase();
    setIsCorrect(correct);
    setFlipped(true);
    setHasAnswered(true);

    answersRef.current = [
      ...answersRef.current,
      { englishWord: current.word, answersStatus: correct },
    ];
  };

  const handleNext = () => {
    setFlipped(false);
    setHasAnswered(false);

    setTimeout(() => {
      const nextIndex = currentIndex + 1;

      if (nextIndex >= deck.flashcards.length) {
        setIsFinished(true);
        sendAnswers(answersRef.current);
      } else {
        setCurrentIndex(nextIndex);
        setUserAnswer('');
        setIsCorrect(null);
      }
    }, 500);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">{deck.title}</h1>

      {isFinished ? (
        <div className="text-center mt-10">
          <p className="text-xl text-green-700 font-medium mb-4">
            🎉 Вітаємо! Ви завершили колоду.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <Flashcard
              word={current.word}
              translation={current.translation}
              isFlipped={flipped}
              onFlip={hasAnswered ? () => setFlipped((f) => !f) : undefined}
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Введи переклад..."
              className={clsx(
                'px-4 py-2 rounded-xl border transition max-w-[400px]',
                isCorrect === null && 'border-gray-300',
                isCorrect === true && 'border-green-500 bg-green-50',
                isCorrect === false && 'border-red-500 bg-red-50',
              )}
            />

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
              onClick={handleSubmit}
              disabled={!(isCorrect === null) || !userAnswer}
            >
              Перевірити
            </Button>

            <Button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-xl transition"
              onClick={handleNext}
              disabled={!userAnswer && isCorrect === null}
            >
              Наступна
            </Button>
          </div>
        </>
      )}
    </section>
  );
};
