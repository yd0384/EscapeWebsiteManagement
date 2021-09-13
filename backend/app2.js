var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

require('./passport').config(passport);
require('dotenv').config();

var indexRouter = require('./routes/index2');
var loginRouter = require('./routes/login');

var app2 = express();

app2.set('views', path.join(__dirname, 'views'));
app2.set('view engine', 'pug');

app2.set('views', path.join(__dirname, 'views'));
app2.set('view engine', 'pug');

app2.use(logger('dev'));
app2.use(express.json());
app2.use(express.urlencoded({ extended: false }));
app2.use(cookieParser());
app2.use(cookieParser(process.env.COOKIE_SECRET));
app2.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
  }
}));
app2.use(passport.initialize());
app2.use(passport.session());

app2.use(express.static(path.join(__dirname, 'public2')));

app2.use('/', indexRouter);
app2.use('/api/login', loginRouter);

// catch 404 and forward to error handler
app2.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app2.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app2;