import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { Languages, Minus, Square, X } from 'lucide-react';
import Header from './components/Header';
import Settings from './components/Settings';
import Flashcard from './components/Flashcard';
import AnswerButtons from './components/AnswerButtons';
import ProgressCounter from './components/ProgressCounter';
import DifficultWords from './components/DifficultWords';
import Statistics from './components/Statistics';
import { useFlashcards } from './hooks/useFlashcards';
import './styles/winxp.css';

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
    navigateCards,
    progress,
    resetProgress,
    isStatsOpen,
    toggleStats
  } = useFlashcards();

  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 50 });

  if (isMinimized) {
    return (
      <div className="winxp-desktop">
        <div className="winxp-taskbar">
          <button 
            className="winxp-start"
            onClick={() => setIsMinimized(false)}
          >
            <Languages className="w-5 h-5" />
            Thai Flashcard Trainer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="winxp-desktop">
      <Rnd
        default={{
          x: position.x,
          y: position.y,
          width: 600,
          height: 'auto'
        }}
        minWidth={400}
        bounds="window"
        onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
        className="winxp-window"
      >
        <div className="winxp-titlebar">
          <div className="winxp-title">
            <Languages className="w-5 h-5" />
            Thai Flashcard Trainer
          </div>
          <div className="winxp-controls">
            <button 
              className="winxp-button"
              onClick={() => setIsMinimized(true)}
            >
              <Minus className="w-3 h-3" />
            </button>
            <button className="winxp-button">
              <Square className="w-3 h-3" />
            </button>
            <button className="winxp-button text-red-600">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="winxp-content">
          <Header onShowStats={toggleStats} />
          
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
                    You've completed {completedToday} cards for this session. Take a break or start a new session.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Complete!</h2>
                <p className="text-gray-600 mb-6">
                  You've completed {completedToday} cards for this session. Take a break or start a new session.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start New Session
                </button>
              </div>
            )}
          </main>
        </div>

        <Statistics 
          progress={progress}
          onReset={resetProgress}
          isOpen={isStatsOpen}
          onClose={toggleStats}
        />
      </Rnd>

      <div className="winxp-taskbar">
        <button className="winxp-start">
          <Languages className="w-5 h-5" />
          Thai Flashcard Trainer
        </button>
      </div>
    </div>
  );
}

export default App;