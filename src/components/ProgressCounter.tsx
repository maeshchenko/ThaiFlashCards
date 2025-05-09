import React from 'react';

interface ProgressCounterProps {
  completedToday: number;
}

const ProgressCounter: React.FC<ProgressCounterProps> = ({ completedToday }) => {
  return (
    <div className="text-center my-4">
      <p className="text-gray-600 font-medium">
        Words completed today: <span className="text-blue-600 font-bold">{completedToday}</span>
      </p>
    </div>
  );
};

export default ProgressCounter;