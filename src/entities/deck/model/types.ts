export interface Deck {
  id: string;
  title: string;
  userId: string;
  user: string;
  englishLvl: string;
  flashcards: CustomFlashcard[];
  createdAt: Date;
  updatedAt: Date;
}

interface CustomFlashcard {
  id: string;
  word: string;
  translation: string;
  example: string;
  createdAt: Date;
  updatedAt: Date;
}
