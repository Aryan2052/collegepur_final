import React from 'react';
import { Book } from '../types';
import { BookProgress } from './BookProgress';
import { Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onProgressChange: (id: string, progress: number) => void;
  onNotesChange: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onProgressChange,
  onNotesChange,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
        </div>
        <button
          onClick={() => onDelete(book.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>
      </div>
      
      <div className="mt-4">
        <BookProgress
          progress={book.progress}
          onProgressChange={(value) => onProgressChange(book.id, value)}
        />
      </div>
      
      <div className="mt-4">
        <textarea
          value={book.notes}
          onChange={(e) => onNotesChange(book.id, e.target.value)}
          placeholder="Add your notes here..."
          className="w-full h-32 p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};