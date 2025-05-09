import React from 'react';
import { BookOpen, Shuffle, Settings as SettingsIcon } from 'lucide-react';
import { FlashcardSettings } from '../types/flashcard';

interface SettingsProps {
  settings: FlashcardSettings;
  onToggleLearningMode: () => void;
  onSetCardsPerSession: (count: number) => void;
  onToggleShuffle: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  settings,
  onToggleLearningMode,
  onSetCardsPerSession,
  onToggleShuffle
}) => {
  return (
    <div className="mb-8 flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleLearningMode}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${settings.isLearningMode 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          <BookOpen className="w-5 h-5" />
          {settings.isLearningMode ? 'Study Mode' : 'Learning Mode'}
        </button>
        
        <button
          onClick={onToggleShuffle}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${settings.isShuffleEnabled 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
          `}
        >
          <Shuffle className="w-5 h-5" />
          Shuffle Cards
        </button>
      </div>

      <div className="flex items-center gap-4">
        <SettingsIcon className="w-5 h-5 text-gray-500" />
        <select
          value={settings.cardsPerSession}
          onChange={(e) => onSetCardsPerSession(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5 cards per session</option>
          <option value="10">10 cards per session</option>
          <option value="15">15 cards per session</option>
          <option value="20">20 cards per session</option>
        </select>
      </div>
    </div>
  );
};

export default Settings