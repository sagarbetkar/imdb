const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  shot: String,
  name: String,
  title: String,
  people : String,
  createdAt: Date,
  modifiedAt: Date
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
