const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  photo: String,
  name: String,
  title: String,
  people : String,
  createdAt: Date,
  modifiedAt: Date
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
