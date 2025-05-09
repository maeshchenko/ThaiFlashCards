import { useState, useEffect, useCallback } from 'react';
import { Flashcard, DifficultyLevel, FlashcardSettings } from '../types/flashcard';
import { initialFlashcards } from '../data/initialData';

export const useFlashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [completedToday, setCompletedToday] = useState<number>(0);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
  const [settings, setSettings] = useState<FlashcardSettings>({
    isLearningMode: false,
    cardsPerSession: 10,
    isShuffleEnabled: true
  });
  const [difficultCards, setDifficultCards] = useState<Set<number>>(new Set());
  const [sessionCards, setSessionCards] = useState<number[]>([]);
  
  useEffect(() => {
    const shuffleCards = (cards: Flashcard[]) => 
      settings.isShuffleEnabled ? cards.sort(() => Math.random() - 0.5) : cards;
    
    const shuffled = shuffleCards([...initialFlashcards]);
    setCards(shuffled);
    setSessionCards(shuffled.slice(0, settings.cardsPerSession).map(card => card.id));
  }, [settings.isShuffleEnabled, settings.cardsPerSession]);

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

    let nextPosition = 0;
    switch (difficulty) {
      case 'dontRemember':
        nextPosition = 1;
        const newFailureCount = (currentCard.failureCount || 0) + 1;
        if (newFailureCount >= 2) {
          setDifficultCards(prev => new Set(prev).add(currentCard.id));
        }
        if (newFailureCount >= 3) {
          setSessionCards(prev => prev.filter(id => id !== currentCard.id));
          return;
        }
        break;
      case 'hard':
        nextPosition = 5;
        break;
      case 'easy':
        nextPosition = 10;
        if (difficultCards.has(currentCard.id)) {
          setDifficultCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.id);
            return newSet;
          });
        }
        break;
    }
    
    const updatedCards = [...cards];
    const targetPosition = Math.min(
      currentCardIndex + nextPosition,
      updatedCards.length - 1
    );
    
    updatedCards.splice(currentCardIndex, 1);
    updatedCards.splice(targetPosition, 0, {
      ...currentCard,
      nextShowAt: targetPosition,
      failureCount: difficulty === 'dontRemember' ? (currentCard.failureCount || 0) + 1 : 0,
      isDifficult: difficultCards.has(currentCard.id)
    });
    
    if (!completedIds.has(currentCard.id)) {
      setCompletedIds(prev => new Set(prev).add(currentCard.id));
      setCompletedToday(prev => prev + 1);
    }
    
    setCards(updatedCards);
    setIsRevealed(false);
    setCurrentCardIndex(prev => 
      prev >= updatedCards.length - 1 ? 0 : prev
    );
  }, [cards, currentCardIndex, completedIds, currentCard, difficultCards, settings.isLearningMode]);

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

  const isSessionComplete = sessionCards.length === 0;

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
    hasCards: cards.length > 0,
    navigateCards
  };
};