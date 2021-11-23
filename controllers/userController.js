const User = require("../models/user-model");
const { genPassword } = require('../lib/passwordUtils');
const passport = require('passport');

/*
 * -------------- USER CONTROLLERS ----------------
*/

// READ: display list of all users
exports.index = (req, res) => {
  User.find({})
  .exec((err, contestants) => {
    res.status("200").json(contestants)
  })
};

// READ: find user by id #
exports.user_profile = (req, res, next) => {
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      res.status(404).send({status: 'error'})
    } else {
      res.status(200).json(user)
    }
  });
};

// CREATE: register a new user to the DB
exports.user_create = (req, res, next) => {
  const newUser = new User({username: req.body.username});
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  newUser.save((err, saved) => {
    if (!err) {
      User.findOneAndUpdate({
        _id: saved._id
      }, {
        $set: {
          hash: hash,
          salt: salt
        }
      }, {
        new: true
      })
      .exec((err, user) => {
        res.status(201).send({msg: "user has been registered."})
      })
    } else {
      res.status(501).end()
    }
  })
};

// UPDATE: add a saved image to user profile
exports.user_saveImage = (req, res) => {
  User.findOneAndUpdate(
    { 
      _id: req.params.id
    },{
      $push: {'savedImages': req.body.image}
    }, 
    { 
      new: true 
    })
    .then((user) => {
      res.status(200).send({
        status: 'ok',
        images: user.savedImages
      })
    });
};

exports.user_login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { console.log(info) }
    if (err) { res.status(501).end(); }
    if (!user) { return res.status(404).end(); }
    req.logIn(user, (err) => {
      if (err) { return console.log(err); }
      return res.json(user);
    });
  })(req, res, next)
};

// logout user
exports.logout = (req, res, next) => {
  req.logout();
};