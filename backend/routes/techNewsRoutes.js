const express = require('express');
const router = express.Router();
const axios = require('axios');
const TechNews = require('../models/TechNews');

router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.q || ''; // Get search term from query parameter
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: searchTerm || 'technology', // Use search term, default to 'technology'
        apiKey: 'ab5072ea06494f4e820f29a6ca74fd2d',
      },
    });

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: new Date(article.publishedAt),
      source: article.source.name,
    }));

    // Optionally save to MongoDB
    await TechNews.insertMany(articles);

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tech news', error: error.message });
  }
});

module.exports = router;