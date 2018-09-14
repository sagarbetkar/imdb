const Tv = require('../models/tv');

exports.postNewTv = (req, res) => {
  let {
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt,
    status
  } = req.body;

  var tv = new Tv({
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
    createdAt,
    modifiedAt,
    status
  });
  Tv.save().then((tv) => {
    console.log('Added successfully');
    res.json({
      message: "Added successfully",
      status: 200
    });
  }).catch(function(err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
};

exports.getAllTv = (req, res) => {
  var query = Movie.find()
  if (req.query.title) {
    query.where({ title: req.query.title });
  }
  query.select('title status -_id');
  query.limit(req.query.limit || 10);
  query.exec ((error, tv) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (tv) {
      res.json({
        data: tv,
        message: "All Tvs fetched",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.getTvById = (req, res) => {
  Tv.findById(req.params.id, (err, tv) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (tv) {
      res.json({
        data: tv,
        message: "User data fetched successfully",
        status: 200
      });
    } else {
      res.json({
        message: "No data found",
        status: 200
      });
    }
  });
};

exports.updateTvById = (req, res) => {
  console.log(req.body);
  const {
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
    status
  } = req.body;
  Tv.update({
    _id: req.params.id
  }, {
    title,
    posterUrl,
    trailerUrl,
    description,
    director,
    stars,
    episode,
    photourl,
    storyline,
    keywords,
    genres,
    status
  }, {}, (error, tv) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(tv);
  });
};

exports.deleteTvById = (req, res) => {
  Tv.findOneAndDelete({
    _id: req.params.id
  }, (error, deleteId) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    res.json({
      message: "Deleted successfully"
    });
  });
};
