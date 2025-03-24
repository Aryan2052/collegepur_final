// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [
    {
      type: { type: String, enum: ['news', 'book'], required: true }, // Differentiate between news and book
      itemId: { type: String, required: true }, // ID of the news article or book
      title: { type: String, required: true }, // Store title for easy display
      details: { type: Object }, // Store additional details (e.g., author, source, etc.)
    },
  ],
});

module.exports = mongoose.model('User', userSchema);