import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Flashcard } from '../types/flashcard';

interface DifficultWordsProps {
  words: Flashcard[];
}

const DifficultWords: React.FC<DifficultWordsProps> = ({ words }) => {
  if (words.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-yellow-600" />
        <h2 className="text-lg font-semibold text-yellow-800">Difficult Words</h2>
      </div>
      
      <div className="space-y-4">
        {words.map(word => (
          <div key={word.id} className="p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-bold text-gray-800">{word.word}</span>
              <span className="text-gray-600">{word.transcription}</span>
            </div>
            <p className="text-gray-700">{word.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultWords;