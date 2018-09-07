var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/imdb');
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('open', () => console.log("success in connecting to mongodb"));

module.exports = app;
app.listen(3000, () => console.log('Express server at 3000'));
