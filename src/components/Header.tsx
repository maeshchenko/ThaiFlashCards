import React from 'react';
import { Languages, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onShowStats: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowStats }) => {
  return (
    <header className="py-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Languages className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">Thai Flashcard Trainer</h1>
        </div>
        <button
          onClick={onShowStats}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Show Statistics"
        >
          <BarChart3 className="w-6 h-6 text-blue-500" />
        </button>
      </div>
      <p className="text-center text-gray-600 mt-2">Master Thai vocabulary with spaced repetition</p>
    </header>
  );
};

export default Header;