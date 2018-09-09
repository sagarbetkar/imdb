const Showtime = require('../models/showtimes');

exports.postNewShowtime = (req, res) => {
  let {
    theaterName,
    movieName,
    address,
    time,
    rating,
    createdAt,
    modifiedAt
  } = req.body;

  var user = new User ({
    theaterName,
    movieName,
    address,
    time,
    rating,
    createdAt,
    modifiedAt
  })
  showtime.save().then((showtime) => {
    console.log('Added successfully');
    res.json(showtime);
  })
};
