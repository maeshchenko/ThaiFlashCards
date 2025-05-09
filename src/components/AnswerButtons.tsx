import React from 'react';
import { XCircle, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { DifficultyLevel } from '../types/flashcard';

interface AnswerButtonsProps {
  isRevealed: boolean;
  isLearningMode: boolean;
  onReveal: () => void;
  onAnswer: (difficulty: DifficultyLevel) => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
}

const AnswerButtons: React.FC<AnswerButtonsProps> = ({ 
  isRevealed, 
  isLearningMode,
  onReveal, 
  onAnswer,
  onNavigate
}) => {
  if (isLearningMode) {
    return (
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => onNavigate?.('prev')}
          className="
            flex items-center gap-2 px-6 py-3
            bg-gray-100 text-gray-700 hover:bg-gray-200
            rounded-lg transition duration-200
            focus:outline-none focus:ring-2 focus:ring-gray-400
          "
        >
          <ArrowLeft className="w-5 h-5" />
          Previous
        </button>
        <button 
          onClick={() => onNavigate?.('next')}
          className="
            flex items-center gap-2 px-6 py-3
            bg-blue-500 text-white hover:bg-blue-600
            rounded-lg transition duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-400
          "
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (!isRevealed) {
    return (
      <button 
        onClick={onReveal}
        className="
          w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 
          text-white rounded-lg transition duration-200 shadow-md
          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400
          text-lg font-medium
        "
      >
        Show Answer
      </button>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <button 
        onClick={() => onAnswer('dontRemember')}
        className="
          flex flex-col items-center justify-center p-4
          bg-red-100 text-red-700 hover:bg-red-200
          rounded-lg transition duration-200
          focus:outline-none focus:ring-2 focus:ring-red-400
        "
      >
        <XCircle className="w-6 h-6 mb-1" />
        <span className="text-sm font-medium">Don't Remember</span>
      </button>
      
      <button 
        onClick={() => onAnswer('hard')}
        className="
          flex flex-col items-center justify-center p-4
          bg-yellow-100 text-yellow-700 hover:bg-yellow-200
          rounded-lg transition duration-200
          focus:outline-none focus:ring-2 focus:ring-yellow-400
        "
      >
        <AlertCircle className="w-6 h-6 mb-1" />
        <span className="text-sm font-medium">Hard</span>
      </button>
      
      <button 
        onClick={() => onAnswer('easy')}
        className="
          flex flex-col items-center justify-center p-4
          bg-green-100 text-green-700 hover:bg-green-200
          rounded-lg transition duration-200
          focus:outline-none focus:ring-2 focus:ring-green-400
        "
      >
        <CheckCircle className="w-6 h-6 mb-1" />
        <span className="text-sm font-medium">Easy</span>
      </button>
    </div>
  );
};

export default AnswerButtons