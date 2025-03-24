import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { SearchResult } from '../types';

export const ExploreBooks: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
      );
      const data = await response.json();
      setResults(data.docs);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Explore Books</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchBooks()}
            placeholder="Search for books..."
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={searchBooks}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            <Search size={20} />
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((book) => (
            <div key={book.key} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex gap-4">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded"
                  />
                ) : (
                  <div className="w-32 h-48 bg-gray-200 rounded flex items-center justify-center">
                    <BookOpen size={40} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  {book.author_name && (
                    <p className="text-gray-600">{book.author_name[0]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};