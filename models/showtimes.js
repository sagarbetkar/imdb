const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  theaterName: String,
  movieName: String,
  address: {
    lane: String,
    area: String,
    city: String,
    pincode: String,
    phone_no: String,
  },
  rating: String,
  time: Array,
  createdAt: Date,
  modifiedAt: Date
});

const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
