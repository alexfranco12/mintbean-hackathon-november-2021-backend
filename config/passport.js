const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = require('../models/user-model');
const validatePassword = require('../lib/passwordUtils').validatePassword;

// const customFields = {
//   usernameField: 'username',
//   passwordField: 'password'
// }

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ 
    username: username 
  }).then(user => {
    if (!user) { return done(null, false) }

    const isValid = validatePassword(password, user.hash, user.salt);
    if (isValid) { return done(null, user) } 
    else { return done(null, false ) }

  }).catch(err =>  done(err));
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});