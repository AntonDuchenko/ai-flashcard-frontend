import { UsersRound, Layers3, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/shared/lib/utils/utils';

interface DeckCardProps {
  title: string;
  flashcardCount: number;
  createdAt: Date;
  isCompleted?: boolean;
  author?: string;
  onClick?: () => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  title,
  flashcardCount,
  createdAt,
  isCompleted = false,
  author,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md transition duration-200',
        isCompleted && 'cursor-default pointer-events-none',
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>
        <div
          className={cn(
            'flex justify-center items-center text-white rounded-2xl font-semibold text-sm px-3 py-1',
            {
              'bg-green-600': isCompleted,
              'bg-blue-600': !isCompleted,
            },
          )}
        >
          {isCompleted ? 'Completed' : 'New'}
        </div>
      </div>

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
