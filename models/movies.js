const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  poster: String,
  trailer: String,
  description: String,
  director : String,
  writer: String,
  stars: String,
  storyline: String,
  keywords: String,
  genres: String,
  createdAt: Date,
  modifiedAt: Date
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
