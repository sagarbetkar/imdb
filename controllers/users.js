const User = require('../models/users');

exports.postNewUser = (req, res) => {
  let {
    firstName,
    lastName,
    email,
    password,
    facebook,
    google,
    createdAt,
    modifiedAt
  } = req.body;

  var user = new User({
    firstName,
    lastName,
    email,
    password,
    facebook,
    google,
    createdAt,
    modifiedAt
  });
  user.save().then((user) => {
    console.log('Added successfully');
    res.json(user);
  })
};

exports.getAllUsers = (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (users) {
      res.json({
        data: users,
        message: "All users fetched",
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

exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, users) => {
    if (err) {
      res.json({
        message: "Server error, Please try after some time.",
        status: 500
      });
    }
    if (users) {
      res.json({
        data: users,
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

exports.updateUserById = (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    facebook,
    google
  } = req.body;
  User.update({
    _id: req.params.id
  }, {
    firstName,
    lastName,
    email,
    password,
    facebook,
    google
  }, {}, (error, user) => {
    if (error)
      res.json({
        error: error,
        status: 500
      });
    console.log(error);
    res.json(user);
  });
};

exports.deleteUserById = (req, res) => {
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
