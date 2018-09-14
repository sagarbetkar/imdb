const mongoose = require('mongoose');

const celebSchema = new mongoose.Schema({
  name: {type: String, required: true},
  picurl: String,
  dob: Date,
  height: {
    value: Number,
    unit: {type: String, enum: ['cm', 'inch'], default: 'cm'}
  },
  bio: String,
  trivia: String,
  createdAt: { type: Date, default: Date.now},
  modifiedAt: { type: Date, default: Date.now}
});

const Celeb = mongoose.model('Celeb', celebSchema);

module.exports = Celeb;
