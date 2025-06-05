import { UsersRound, Layers3, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DeckCardProps {
  title: string;
  flashcardCount: number;
  createdAt: Date;
  author?: string;
  onClick?: () => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  title,
  flashcardCount,
  createdAt,
  author,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md transition duration-200"
    >
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>

      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Layers3 size={16} />
          {flashcardCount} карточек
        </div>
        {author && (
          <div className="flex items-center gap-2">
            <UsersRound size={16} />
            Автор: {author}
          </div>
        )}
        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          Создана {formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ru })}
        </div>
      </div>
    </div>
  );
};
