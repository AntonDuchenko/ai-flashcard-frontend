import type { Flashcard } from '@/entities/flashcard/model/types';

export interface Deck {
  id: string;
  title: string;
  userId: string;
  user: string;
  type: 'DAILY' | 'REPEATING';
  englishLvl: string;
  flashcards: Flashcard[];
  createdAt: Date;
  updatedAt: Date;
}
