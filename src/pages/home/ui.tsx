import { DeckCard } from '@/entities/deck/ui/Deck';
import { useDecks } from '@/shared/lib/hooks/useDecks';
import { useProfile } from '@/shared/lib/hooks/useProfile';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Calendar } from '@/shared/ui/calendar';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading } = useDecks();
  const { data: profile } = useProfile();
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  useEffect(() => {
    if (profile?.dailyDeckCompletions?.length) {
      const firstCompletion = profile.dailyDeckCompletions[0];
      const lastCompletion = profile.dailyDeckCompletions[profile.dailyDeckCompletions.length - 1];
      setFromDate(new Date(firstCompletion.date));
      setToDate(new Date(lastCompletion.date));
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-600">
        Загрузка колод...
      </div>
    );
  }

  if (!decks || decks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh] text-gray-500">
        Колоды еще не созданы. Создайте свою первую колоду.
      </div>
    );
  }

  const firstDeck = decks.find((deck) => deck.type === 'DAILY');
  const secondDeck = decks.find((deck) => deck.type === 'REPEATING');

  return (
    <section className="flex flex-col flex-grow px-4 py-8 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-6 flex-grow min-h-0">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          {firstDeck && (
            <DeckCard
              key={firstDeck.id}
              title={firstDeck.title}
              flashcardCount={firstDeck.flashcards.length}
              isCompleted={profile?.isDailyComplete}
              createdAt={firstDeck.createdAt}
              author={firstDeck.user}
              onClick={() => navigate(`/deck/${firstDeck.id}`)}
              className="w-full h-full"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full h-full rounded-xl shadow bg-gray-100 flex justify-center min-h-[365px] p-4"
        >
          <Calendar
            mode="range"
            selected={{
              from: fromDate || undefined,
              to: toDate || undefined,
            }}
            disabled
            className="rounded-md"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {secondDeck ? (
            <DeckCard
              key={secondDeck.id}
              title={secondDeck.title}
              flashcardCount={secondDeck.flashcards.length}
              createdAt={secondDeck.createdAt}
              author={secondDeck.user}
              onClick={() => navigate(`/deck/${secondDeck.id}`)}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full rounded-xl shadow bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              Колода для повторения еще не создана
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full h-full rounded-xl shadow bg-gray-100 flex items-center justify-center"
        >
          Статистика 2
        </motion.div>
      </div>
    </section>
  );
};
