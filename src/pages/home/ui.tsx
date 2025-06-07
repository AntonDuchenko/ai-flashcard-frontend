import type { Deck } from '@/entities/deck/model/types';
import { DeckCard } from '@/entities/deck/ui/Deck';
import { useDecks } from '@/shared/lib/hooks/useDecks';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading } = useDecks();

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

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Мои колоды</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {decks.map((deck: Deck) => (
          <DeckCard
            key={deck.id}
            title={deck.title}
            flashcardCount={deck.flashcards.length}
            createdAt={deck.createdAt}
            author={deck.user}
            onClick={() => {
              navigate(`/deck/${deck.id}`);
            }}
          />
        ))}
      </div>
    </section>
  );
};
