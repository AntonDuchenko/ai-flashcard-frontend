import type { Flashcard } from '@/entities/flashcard/model/types';

export interface Profile {
  createdAt: string;
  dailyComplete: boolean;
  daysStreak: number;
  email: string;
  englishLvl: string;
  id: string;
  learnedWords: Flashcard[];
}
