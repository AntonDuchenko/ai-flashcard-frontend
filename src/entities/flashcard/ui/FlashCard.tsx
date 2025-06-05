import React from 'react';
import { cn } from '@/shared/lib/utils/utils';

interface FlashcardProps {
  word: string;
  translation: string;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  word,
  translation,
  isFlipped = false,
  onFlip,
}) => {
  return (
    <div className="w-full max-w-xs aspect-[3/2] perspective cursor-pointer" onClick={onFlip}>
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-500 transform-style preserve-3d',
          isFlipped && 'rotate-y-180',
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl shadow-lg text-2xl font-semibold text-blue-800 backface-hidden">
          {word}
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center bg-blue-600 rounded-2xl shadow-lg text-2xl font-semibold text-white backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {translation}
        </div>
      </div>
    </div>
  );
};
