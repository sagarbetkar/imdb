const User = require('../models/users');

exports.postNewUser = (req, res, next) => {
  if (req.body.username && req.body.email && req.body.password) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) {
        return next({
          message: err,
          status: 500
        });
      }
      if (user) {
        return res.json({
          message: 'User already exists',
          status: 406
        });
      } else {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        user.save((err) => {
          if (err) {
            return next({
              message: 'User registration failed',
              err: err,
              status: 500
            });
          }
          res.json({
            message: 'User registered successfully',
            status: 200
          });
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

exports.getAllUsers = (req, res) => {
  User.find({}, (error, users) => {
    console.log(users);
    if (error) {
      res.json({
        message: 'Server error, Please try after some time.',
        status: 500
      });
    }
    if (users.length != 0) {
      res.json({
        data: users,
        message: 'All users fetched',
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

exports.getUserById = (req, res) => {
  if (req.params.id) {
    User.findById(req.params.id, (err, users) => {
      if (err) {
        res.json({
          message: 'Server error, Please try after some time.',
          status: 500
        });
      }
      if (users.lenght != 0) {
        res.json({
          data: users,
          message: 'User data fetched successfully',
          status: 200
        });
      } else {
        res.json({
          message: 'No data found',
          status: 200
        });
      }
    });
  } else {
    res.json({
      message: 'Id not present',
      status: 401
    });
  }
};

exports.updateUserById = (req, res) => {
  if (req.body.username && req.params.id) {
    User.findOne({_id: req.params.id}, (err, user) => {
      if (err) {
        res.json({
          message: 'User not found',
          status: 500
        });
      } else {
        user.username = req.body.username;
        user.save((err) => {
          if (err) {
            res.json({
              status: 500,
              err: err,
              message: 'Update failed'
            });
          }
          res.json({
            message: 'User updated successfully',
            data: user,
            status: 200
          });
        });
      }
    });
  }
};

exports.deleteUserById = (req, res) => {
  User.findOneAndDelete({_id: req.params.id}, (error, deleteId) => {
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
