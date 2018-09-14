const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  shoturl: String,
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'Celeb' },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
