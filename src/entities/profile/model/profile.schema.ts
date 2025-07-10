import type { Flashcard } from '@/entities/flashcard/model/types';

export interface Profile {
  createdAt: string;
  isDailyComplete: boolean;
  daysStreak: number;
  email: string;
  englishLvl: string;
  id: string;
  learnedWords: Flashcard[];
  dailyDeckCompletions: DailyDeckCompletion[];
}

interface DailyDeckCompletion {
  id: string;
  userId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
