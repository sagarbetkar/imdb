const Celeb = require('../models/celebs');

exports.postNewCeleb = (req, res) => {
  let {
    name,
    picurl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  } = req.body;

  var celeb = new Celeb({
    name,
    picurl,
    dob,
    height,
    bio,
    trivia,
    createdAt,
    modifiedAt
  });
  celeb.save().then((newCeleb) => {
    console.log('Added successfully');
    res.json({
      message: `Added ${newCeleb.title} successfully`,
      status: 200
    });
  }).catch(function (err) {
    if (err) {
      console.log(err);
      res.json({
        message: 'Server error',
        status: 500
      });
    }
  });
};

exports.getAllCelebs = (req, res) => {
  var query = Movie.find()
  if (req.query.name) {
    query.where({ title: req.query.name });
  }
  query.select('name -_id');
  query.limit(req.query.limit || 10);
  query.exec((error, celebs) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: "All celebs fetched",
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

exports.getCelebById = (req, res) => {
  Celeb.findById(req.params.id, (err, celebs) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: "Celeb data fetched successfully",
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

exports.updateCelebById = (req, res) => {
  console.log(req.body);
  const {
    name,
    picurl,
    dob,
    height,
    bio,
    trivia
  } = req.body;
  Celeb.update({
    _id: req.params.id
  }, {
    name,
    picurl,
    dob,
    height,
    bio,
    trivia
  }, {}, (error, celeb) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(celeb);
  });
};

exports.deleteCelebById  = (req, res) => {
  User.findOneAndDelete({
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
