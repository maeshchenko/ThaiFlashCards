import React from 'react';
import { Languages } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-6">
      <div className="flex items-center justify-center">
        <Languages className="w-8 h-8 text-blue-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Thai Flashcard Trainer</h1>
      </div>
      <p className="text-center text-gray-600 mt-2">Master Thai vocabulary with spaced repetition</p>
    </header>
  );
};

export default Header;