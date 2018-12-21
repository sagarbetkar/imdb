const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  shoturl: String,
  actor: [String],
  movie: {type: String},
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
