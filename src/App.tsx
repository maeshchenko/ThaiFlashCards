import React from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import Flashcard from './components/Flashcard';
import AnswerButtons from './components/AnswerButtons';
import ProgressCounter from './components/ProgressCounter';
import DifficultWords from './components/DifficultWords';
import { useFlashcards } from './hooks/useFlashcards';

function App() {
  const {
    currentCard,
    isRevealed,
    completedToday,
    settings,
    difficultWords,
    isSessionComplete,
    revealAnswer,
    processAnswer,
    speakWord,
    toggleLearningMode,
    setCardsPerSession,
    toggleShuffle,
    hasCards,
    navigateCards
  } = useFlashcards();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <Header />
        
        <Settings 
          settings={settings}
          onToggleLearningMode={toggleLearningMode}
          onSetCardsPerSession={setCardsPerSession}
          onToggleShuffle={toggleShuffle}
        />
        
        <main className="flex flex-col items-center justify-center space-y-6">
          {hasCards ? (
            isSessionComplete ? (
              <div className="text-center p-8 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Complete!</h2>
                <p className="text-gray-600 mb-6">
                  You've completed all cards for this session. Take a break or continue practicing.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start New Session
                </button>
              </div>
            ) : (
              <>
                <Flashcard 
                  card={currentCard} 
                  isRevealed={isRevealed}
                  isLearningMode={settings.isLearningMode}
                  onSpeak={speakWord}
                />
                
                <div className="w-full max-w-md mt-6">
                  <AnswerButtons 
                    isRevealed={isRevealed}
                    isLearningMode={settings.isLearningMode}
                    onReveal={revealAnswer}
                    onAnswer={processAnswer}
                    onNavigate={navigateCards}
                  />
                </div>
                
                {!settings.isLearningMode && (
                  <>
                    <ProgressCounter completedToday={completedToday} />
                    <DifficultWords words={difficultWords} />
                  </>
                )}
              </>
            )
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-gray-600">Loading flashcards...</p>
            </div>
          )}
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Thai Flashcard Trainer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;