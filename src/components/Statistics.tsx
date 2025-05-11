import React, { useState } from 'react';
import { BarChart3, RefreshCw, X } from 'lucide-react';
import { FlashcardProgress } from '../types/flashcard';
import { initialFlashcards } from '../data/initialData';

interface StatisticsProps {
  progress: FlashcardProgress[];
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ progress, onReset, isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalWords = progress.length;
  const learnedWords = progress.filter(p => p.repetitions > 0);
  const difficultWords = progress.filter(p => p.repetitions > 0 && p.EF < 2.0);
  const troubleWords = progress.filter(p => p.repetitions === 0);

  const getWordsForCategory = (category: string) => {
    switch (category) {
      case 'learned':
        return learnedWords.map(p => initialFlashcards[p.id - 1]);
      case 'difficult':
        return difficultWords.map(p => initialFlashcards[p.id - 1]);
      case 'trouble':
        return troubleWords.map(p => initialFlashcards[p.id - 1]);
      default:
        return [];
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      onReset();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Learning Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Words</h3>
            <p className="text-2xl font-bold text-gray-900">{totalWords}</p>
          </div>

          <button 
            onClick={() => setSelectedCategory(selectedCategory === 'learned' ? null : 'learned')}
            className="w-full bg-blue-50 p-4 rounded-lg text-left hover:bg-blue-100 transition-colors"
          >
            <h3 className="text-sm font-medium text-blue-500 mb-2">Words Learned</h3>
            <p className="text-2xl font-bold text-blue-700">{learnedWords.length}</p>
          </button>

          <button
            onClick={() => setSelectedCategory(selectedCategory === 'difficult' ? null : 'difficult')}
            className="w-full bg-yellow-50 p-4 rounded-lg text-left hover:bg-yellow-100 transition-colors"
          >
            <h3 className="text-sm font-medium text-yellow-600 mb-2">Difficult Words</h3>
            <p className="text-2xl font-bold text-yellow-700">{difficultWords.length}</p>
          </button>

          <button
            onClick={() => setSelectedCategory(selectedCategory === 'trouble' ? null : 'trouble')}
            className="w-full bg-red-50 p-4 rounded-lg text-left hover:bg-red-100 transition-colors"
          >
            <h3 className="text-sm font-medium text-red-500 mb-2">Trouble Words</h3>
            <p className="text-2xl font-bold text-red-700">{troubleWords.length}</p>
          </button>

          {selectedCategory && (
            <div className="mt-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedCategory === 'learned' && 'Learned Words'}
                {selectedCategory === 'difficult' && 'Difficult Words'}
                {selectedCategory === 'trouble' && 'Trouble Words'}
              </h3>
              {getWordsForCategory(selectedCategory).map(word => (
                <div key={word.id} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-gray-800">{word.word}</span>
                    <span className="text-gray-600">{word.transcription}</span>
                  </div>
                  <p className="text-gray-700">{word.translation}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleReset}
          className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Progress
        </button>
      </div>
    </div>
  );
};

export default Statistics;