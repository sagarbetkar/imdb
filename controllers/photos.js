const Shot = require('../models/shots');

exports.postNewShot = (req, res) => {
  let {
    shot,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  } = req.body;

  var pic = new Shot({
    shot,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  });
  pic.save().then((pic) => {
    console.log('Added successfully');
    res.json(pic);
  })
};


exports.getAllShots = (req, res) => {
  Shot.find({}, (error, shots) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (shots) {
      res.json({
        data: shots,
        message: "All shots fetched",
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

exports.getShotById = (req, res) => {
  Shot.findById(req.params.id, (err, shots) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (shots) {
      res.json({
        data: shots,
        message: "Shot data fetched successfully",
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

exports.updateShotById = (req, res) => {
  console.log(req.body);
  const {
    shot,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  } = req.body;
  Shot.update({
    _id: req.params.id
  }, {
    shot,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  }, {}, (error, shot) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(shot);
  });
};

exports.deleteShotById  = (req, res) => {
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
