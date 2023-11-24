const { sendJsonErrors } = require('./helpers/responseHandler');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  if (err instanceof createError.HttpError) {
    sendJsonErrors(req, res, err, 'HttpError');
  }
  else if(err.name === 'ValidationError'){
    sendJsonErrors(req, res, err, 'ValidationMongooseSchema');
  }
  else if(err.name === 'MongoError'){
    sendJsonErrors(req, res, err, 'MongoError');
  }
  else {
    sendJsonErrors(req, res, err, 'AppError');
  }
});

module.exports = app;
