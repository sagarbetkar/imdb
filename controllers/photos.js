const Photo = require('../models/photos');

exports.postNewPhoto = (req, res) => {
  let {
    photo,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  } = req.body;

  var photo = new Photo({
    photo,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  });
  photo.save().then((photo) => {
    console.log('Added successfully');
    res.json(photo);
  })
};


exports.getAllPhotos = (req, res) => {
  Photo.find({}, (error, photos) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (photos) {
      res.json({
        data: photos,
        message: "All photos fetched",
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

exports.getPhotoById = (req, res) => {
  Photo.findById(req.params.id, (err, photos) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (photos) {
      res.json({
        data: photos,
        message: "Photo data fetched successfully",
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

exports.updatePhotoById = (req, res) => {
  console.log(req.body);
  const {
    photo,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  } = req.body;
  Photo.update({
    _id: req.params.id
  }, {
    photo,
    name,
    title,
    people,
    createdAt,
    modifiedAt
  }, {}, (error, photo) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(photo);
  });
};

exports.deletePhotoById  = (req, res) => {
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
