const Shot = require('../models/shots');

exports.postNewShot = (req, res) => {
  let {shoturl, actor, movie} = req.body;

  var pic = new Shot({
    shoturl,
    actor,
    movie
  });
  pic
    .save()
    .then((pic) => {
      console.log('Added successfully');
      res.json({
        message: 'Added successfully',
        status: 200
      });
    })
    .catch(function(err) {
      if (err) {
        console.log(err);
        res.json({
          message: 'Server error',
          status: 500
        });
      }
    });
};

exports.getAllShots = (req, res) => {
  Shot.find({}, (error, shots) => {
    if (error) {
      res.json({
        message: 'Server error, Please try after some time.',
        status: 500
      });
    }
    if (shots) {
      res.json({
        data: shots,
        message: 'All shots fetched',
        status: 200
      });
    } else {
      res.json({
        message: 'No data found',
        status: 200
      });
    }
  });
};

exports.getShotById = (req, res) => {
  Shot.findById(req.params.id, (err, shots) => {
    if (err) {
      res.json({
        message: 'Server error, Please try after some time.',
        status: 500
      });
    }
    if (shots) {
      res.json({
        data: shots,
        message: 'Shot data fetched successfully',
        status: 200
      });
    } else {
      res.json({
        message: 'No data found',
        status: 200
      });
    }
  });
};

exports.updateShotById = (req, res) => {
  console.log(req.body);
  const {shoturl, actor, movie} = req.body;
  Shot.update(
    {
      _id: req.params.id
    },
    {
      shoturl,
      actor,
      movie
    },
    {},
    (error, shot) => {
      if (error)
        res.json({
          error: error,
          status: 500
        });
      console.log(error);
      res.json({
        message: 'Shot updated',
        status: 200
      });
    }
  );
};

exports.deleteShotById = (req, res) => {
  Shot.findOneAndDelete(
    {
      _id: req.params.id
    },
    (error, deleteId) => {
      if (error)
        res.json({
          error: error,
          status: 500
        });
      res.json({
        message: 'Deleted successfully',
        status: 200
      });
    }
  );
};
