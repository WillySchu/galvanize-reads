const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const override = require('method-override');

const example = require('./routes/landing');
const routes = require('./routes/index');
const books = require('./routes/books');
const authors = require('./routes/authors');
const auth = require('./routes/auth');
const api = require('./routes/api');
const db = require('./lib/dbio');
const setLocals = require('./lib/setLocals');

const app = express();
require('dotenv').load();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(override('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2],
  secret: 'asdf'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(setLocals);

app.use('/', routes);
// app.use('/ex', example);
app.use('/', auth);
app.use('/authors', authors);
app.use('/books', books);
app.use('/api', api);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
