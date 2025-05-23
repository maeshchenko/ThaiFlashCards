export interface Flashcard {
  id: number;
  word: string;
  transcription: string;
  translation: string;
  nextShowAt: number;
  failureCount?: number;
  isDifficult?: boolean;
}

export type DifficultyLevel = 'easy' | 'hard' | 'dontRemember';

export interface FlashcardSettings {
  isLearningMode: boolean;
  cardsPerSession: number;
  isShuffleEnabled: boolean;
}

export interface FlashcardProgress {
  id: number;
  EF: number;
  interval: number;
  repetitions: number;
  nextShowAt: number;
  lastReview: number;
  repeatInSession: boolean;
}