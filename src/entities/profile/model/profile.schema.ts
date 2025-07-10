import type { Flashcard } from '@/entities/flashcard/model/types';

export interface Profile {
  createdAt: string;
  isDailyComplete: boolean;
  daysStreak: number;
  email: string;
  englishLvl: string;
  id: string;
  learnedWords: Flashcard[];
  dailyDeckCompletions: Date[];
}
