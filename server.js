require('dotenv').config();
const express = require('express'),
  cors = require('cors'),
  session = require('express-session'),
  PORT = process.env.PORT || 27017,
  NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var passport = require('passport');
const connection = require('./config/database');

// create mongo store
const MongoStore = require('connect-mongo');

app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// SESSION SETUP
const sessionStore = {
  mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/paint",
  mongooseConnection: connection,
  collection: "sessions"
}

app.use(session({
  // todo: use an environment variable for secret
  secret: process.env.SECRET || "Rusty is a dog",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create(sessionStore),
  cookie: {
    // equals 1 day ( 1day * 24hr/1day * 60min/1hr * 60sec/1min * 1000ms/1sec )
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

// PASSPORT AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

// * custum middleware to check if passport object was created
// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

// ROUTES
require('./routes')(app);

// catch 404
app.use((req, res, next) => {
  res.status(404).send({ 
    status: 404, 
    error: 'Not found' 
  });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  res.status(status).send({ status, error: msg });
});

module.exports = app;

// SERVER 
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get('port')} 
      | Environment : ${app.get('env')}`
  );
});