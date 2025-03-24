const mongoose = require('mongoose');

const techNewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  publishedAt: Date,
  source: String,
  fetchedAt: { type: Date, default: Date.now, expires: '24h' } // Auto-expire after 24 hours
});

module.exports = mongoose.model('TechNews', techNewsSchema);
