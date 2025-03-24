import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { BookCard } from '../components/BookCard';
import { Plus } from 'lucide-react';

export const MyBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  });

  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook: Book = {
        id: Date.now().toString(),
        title: newBookTitle,
        author: newBookAuthor,
        progress: 0,
        notes: '',
      };
      setBooks([...books, newBook]);
      setNewBookTitle('');
      setNewBookAuthor('');
    }
  };

  const updateProgress = (id: string, progress: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, progress } : book
    ));
  };

  const updateNotes = (id: string, notes: string) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, notes } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Reading List</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder="Book title"
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            placeholder="Author"
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addBook}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Book
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onProgressChange={updateProgress}
            onNotesChange={updateNotes}
            onDelete={deleteBook}
          />
        ))}
      </div>
    </div>
  );
};