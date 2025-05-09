import React from 'react';
import { Volume2 } from 'lucide-react';
import { Flashcard as FlashcardType } from '../types/flashcard';

interface FlashcardProps {
  card: FlashcardType;
  isRevealed: boolean;
  isLearningMode?: boolean;
  onSpeak: (text: string) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ 
  card, 
  isRevealed, 
  isLearningMode = false,
  onSpeak 
}) => {
  const showContent = isRevealed || isLearningMode;
  
  return (
    <div 
      className={`
        w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300
        ${showContent ? 'scale-105' : 'scale-100'}
        ${card.isDifficult ? 'border-2 border-yellow-400' : ''}
      `}
    >
      <div className="p-6 md:p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 transition-opacity duration-300">
              {card.word}
            </h2>
            <button
              onClick={() => onSpeak(card.word)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Speak word"
            >
              <Volume2 className="w-6 h-6 text-blue-500" />
            </button>
          </div>
          
          {showContent && (
            <div className="transition-all duration-500 ease-in-out opacity-100 translate-y-0">
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Transcription</h3>
                <p className="text-xl md:text-2xl text-gray-700">{card.transcription}</p>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Translation</h3>
                <p className="text-xl md:text-2xl font-semibold text-gray-800">{card.translation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;