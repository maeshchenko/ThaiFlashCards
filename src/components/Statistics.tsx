import React from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import { FlashcardProgress } from '../types/flashcard';

interface StatisticsProps {
  progress: FlashcardProgress[];
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ progress, onReset, isOpen, onClose }) => {
  if (!isOpen) return null;

  const totalWords = progress.length;
  const learnedWords = progress.filter(p => p.repetitions > 0).length;
  const difficultWords = progress.filter(p => p.repetitions > 0 && p.EF < 2.0).length;
  const troubleWords = progress.filter(p => p.repetitions === 0).length;

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      onReset();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">Learning Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Words</h3>
            <p className="text-2xl font-bold text-gray-900">{totalWords}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-500 mb-2">Words Learned</h3>
            <p className="text-2xl font-bold text-blue-700">{learnedWords}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-600 mb-2">Difficult Words</h3>
            <p className="text-2xl font-bold text-yellow-700">{difficultWords}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-500 mb-2">Trouble Words</h3>
            <p className="text-2xl font-bold text-red-700">{troubleWords}</p>
          </div>
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