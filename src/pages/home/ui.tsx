import { DeckCard } from '@/entities/deck/ui/Deck';
import { useDecks } from '@/shared/lib/hooks/useDecks';
import { useProfile } from '@/shared/lib/hooks/useProfile';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading } = useDecks();
  const { data: profile } = useProfile();

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

        <div className="w-full h-full rounded-xl shadow bg-gray-100 flex items-center justify-center">
          Статистика 1
        </div>

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
            Вторая дека ещё не создана
          </div>
        )}

        <div className="w-full h-full rounded-xl shadow bg-gray-100 flex items-center justify-center">
          Статистика 2
        </div>
      </div>
    </section>
  );
};
