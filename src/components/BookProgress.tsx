import React from 'react';

interface BookProgressProps {
  progress: number;
  onProgressChange: (value: number) => void;
}

export const BookProgress: React.FC<BookProgressProps> = ({ progress, onProgressChange }) => {
  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onProgressChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-sm text-gray-600 mt-1">Progress: {progress}%</div>
    </div>
  );
};