const express = require('express'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session'),
  cors = require('cors'),
  app = express(),

  PORT = process.env.PORT || 3000,
  NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(cors());
app.use(logger('tiny'));

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// parse multipart/form-data
app.use(express.static('public'));

app.use(session({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

// passport setup
app.use(passport.initialize());
app.use(passport.authenticate('session'));

// routes
require('./routes')(app);

// catch 404
app.use((req, res, next) => {
  // log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  // log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

module.exports = app;

app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} 
      | Environment : ${app.get('env')}`
  );
});