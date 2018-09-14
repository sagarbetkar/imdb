const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type : String, required: true, /**unique: true**/},
  posterUrl: String,
  trailerUrl: String,
  description: String,
  //director : mongoose.Schema.Types.ObjectId,
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  stars: [{
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
    characterName: String,
  }],
  photourl: [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Photo'
  }],
//  stars: [actorSchema],
  storyline: String,
  keywords: [String],
  genres: [String],
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now},
  status: { type:String, enum: ['pre-released', 'released', 'banned'], default: 'pre-released'},
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
