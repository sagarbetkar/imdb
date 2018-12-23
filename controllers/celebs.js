const Celeb = require('../models/celebs');

exports.postNewCeleb = (req, res) => {
  if (req.body.name && req.body.picurl && req.body.height) {
    const celeb = new Celeb({
      name: req.body.name,
      picurl: req.body.picurl,
      dob: req.body.dob,
      height: req.body.height
    });
    celeb.save((err) => {
      if (err) {
        return res.json({
          message: 'Celeb registration failed',
          status: 500
        });
      } else {
        res.json({
          message: 'celeb added successfully',
          status: 200
        });
      }
    });
  } else {
    res.json({
      message: 'Incomplete Inputs',
      status: 200
    });
  }
};

exports.getAllCelebs = (req, res) => {
  var query = Celeb.find();
  query.exec((error, celebs) => {
    if (error) {
      res.json({
        message: 'Server error, Please try after some time.',
        status: 500
      });
    }
    if (celebs.length != 0) {
      res.json({
        data: celebs,
        message: 'All celebs fetched',
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

exports.getCelebById = (req, res) => {
  Celeb.findById(req.params.id, (err, celebs) => {
    if (err) {
      res.json({
        message: 'Server error, Please try after some time.',
        status: 500
      });
    }
    if (celebs) {
      res.json({
        data: celebs,
        message: 'Celeb data fetched successfully',
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

exports.updateCelebById = (req, res) => {
  console.log(req.params.id);
  if (req.body.name && req.params.id && req.body.dob && req.body.picurl && req.body.height) {
    Celeb.findOne({_id: req.params.id}, (err, celeb) => {
      console.log(celeb);
      if (err) {
        return res.json({
          message: 'No data found',
          status: 200
        });
      } else {
        celeb.name = req.body.name;
        celeb.picurl = req.body.picurl;
        celeb.dob = req.body.dob;
        celeb.height = req.body.height;
        celeb.save((err, celeb) => {
          if (err) {
            res.json({
              status: 500,
              err: err,
              message: 'Update failed'
            });
          }
          res.json({
            message: 'celeb update successfully',
            status: 200
          });
        });
      }
    });
  } else {
    res.json({
      message: 'Incomplete input',
      status: 406
    });
  }
};

exports.deleteCelebById = (req, res) => {
  Celeb.findOneAndDelete({_id: req.params.id}, (error, deleteId) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    res.json({
      message: 'Deleted successfully',
      status: 200
    });
  });
};
