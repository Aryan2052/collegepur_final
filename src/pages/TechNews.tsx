import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TechNews = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tech-news?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [searchTerm]); // Re-fetch when searchTerm changes

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tech News</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search news by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.length > 0 ? (
          news.map((article: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.description}</p>
              <p className="text-sm text-gray-500">Source: {article.source}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news articles match your search.</p>
        )}
      </div>
    </div>
  );
};

export default TechNews;