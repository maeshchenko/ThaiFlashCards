import { useState, useEffect, useCallback } from 'react';
import { Flashcard, DifficultyLevel, FlashcardSettings, FlashcardProgress } from '../types/flashcard';
import { initialFlashcards } from '../data/initialData';

const STORAGE_KEY = 'anki-progress';
const MS_PER_DAY = 86400000;

const initializeProgress = (cards: Flashcard[]): FlashcardProgress[] => {
  return cards.map((card) => ({
    id: card.id,
    EF: 2.5,
    interval: 1,
    repetitions: 0,
    nextShowAt: 0,
    lastReview: 0,
  }));
};

const calculateNextReview = (
  progress: FlashcardProgress,
  grade: number,
  now: number
): FlashcardProgress => {
  let newProgress = { ...progress };

  if (grade >= 3) {
    newProgress.repetitions += 1;
    if (newProgress.repetitions === 1) {
      newProgress.interval = 1;
    } else if (newProgress.repetitions === 2) {
      newProgress.interval = 6;
    } else {
      newProgress.interval = Math.round(newProgress.interval * newProgress.EF);
    }
    
    let newEF = newProgress.EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    newProgress.EF = Math.max(1.3, newEF);
    newProgress.nextShowAt = now + newProgress.interval * MS_PER_DAY;
  } else {
    newProgress.repetitions = 0;
    newProgress.interval = 1;
    newProgress.nextShowAt = now + MS_PER_DAY;
  }
  
  newProgress.lastReview = now;
  return newProgress;
};

export const useFlashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [completedToday, setCompletedToday] = useState<number>(0);
  const [settings, setSettings] = useState<FlashcardSettings>({
    isLearningMode: false,
    cardsPerSession: 10,
    isShuffleEnabled: true
  });
  const [difficultCards, setDifficultCards] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<FlashcardProgress[]>([]);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
  useEffect(() => {
    const storedProgress = localStorage.getItem(STORAGE_KEY);
    if (!storedProgress) {
      const newProgress = initializeProgress(initialFlashcards);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } else {
      setProgress(JSON.parse(storedProgress));
    }
    
    const now = Date.now();
    const dueCards = initialFlashcards.filter((card, index) => {
      const cardProgress = progress[index];
      return !cardProgress || cardProgress.nextShowAt <= now;
    });
    
    const shuffleCards = (cards: Flashcard[]) => 
      settings.isShuffleEnabled ? cards.sort(() => Math.random() - 0.5) : cards;
    
    setCards(shuffleCards(dueCards));
  }, [settings.isShuffleEnabled]);

  const currentCard = cards[currentCardIndex];

  const speakWord = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    speechSynthesis.speak(utterance);
  }, []);
  
  const revealAnswer = useCallback(() => {
    if (settings.isLearningMode) return;
    setIsRevealed(true);
  }, [settings.isLearningMode]);
  
  const processAnswer = useCallback((difficulty: DifficultyLevel) => {
    if (!currentCard || settings.isLearningMode) return;

    const now = Date.now();
    const gradeMap = { easy: 5, hard: 3, dontRemember: 1 };
    const grade = gradeMap[difficulty];
    
    const cardProgress = progress.find(p => p.id === currentCard.id);
    if (!cardProgress) return;
    
    const newProgress = calculateNextReview(cardProgress, grade, now);
    
    setProgress(prev => {
      const updated = prev.map(p => p.id === currentCard.id ? newProgress : p);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (difficulty === 'dontRemember') {
      const newFailureCount = (currentCard.failureCount || 0) + 1;
      if (newFailureCount >= 2) {
        setDifficultCards(prev => new Set(prev).add(currentCard.id));
      }
    } else if (difficulty === 'easy' && difficultCards.has(currentCard.id)) {
      setDifficultCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.id);
        return newSet;
      });
    }
    
    setCards(prev => prev.filter(card => card.id !== currentCard.id));
    setIsRevealed(false);
    setCompletedToday(prev => prev + 1);
    
    if (currentCardIndex >= cards.length - 1) {
      setCurrentCardIndex(0);
    }
  }, [cards, currentCardIndex, currentCard, difficultCards, settings.isLearningMode, progress]);

  const navigateCards = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentCardIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1));
    } else {
      setCurrentCardIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0));
    }
  }, [cards.length]);

  const toggleLearningMode = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      isLearningMode: !prev.isLearningMode
    }));
    setIsRevealed(false);
  }, []);

  const setCardsPerSession = useCallback((count: number) => {
    setSettings(prev => ({
      ...prev,
      cardsPerSession: count
    }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      isShuffleEnabled: !prev.isShuffleEnabled
    }));
  }, []);

  const getDifficultWords = useCallback(() => 
    cards.filter(card => difficultCards.has(card.id)), 
    [cards, difficultCards]
  );

  const resetProgress = useCallback(() => {
    const newProgress = initializeProgress(initialFlashcards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
    setDifficultCards(new Set());
    setCompletedToday(0);
    window.location.reload();
  }, []);

  const toggleStats = useCallback(() => {
    setIsStatsOpen(prev => !prev);
  }, []);

  const isSessionComplete = cards.length === 0;
  const hasCards = cards.length > 0;

  return {
    currentCard,
    isRevealed,
    completedToday,
    settings,
    difficultWords: getDifficultWords(),
    isSessionComplete,
    revealAnswer,
    processAnswer,
    speakWord,
    toggleLearningMode,
    setCardsPerSession,
    toggleShuffle,
    hasCards,
    navigateCards,
    progress,
    resetProgress,
    isStatsOpen,
    toggleStats
  };
};