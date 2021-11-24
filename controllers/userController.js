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

exports.user_data = (req, res) => {
  res.send(req.user)
}

// CREATE: register a new user to the DB
exports.user_create = (req, res, next) => {
  User.findOne(
    {
      username: req.body.username
    }, 
    async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("username already exists")
      if (!doc) {
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
          username: req.body.username,
          hash: hash,
          salt: salt
        });

        await newUser.save((err) => {
          if (err) return res.status(501).end()
          req.login(newUser, (err) => {
            if (err) return res.status(501).end()
            res.json(newUser)
          })
        })
      }
    }
  )
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
    if (err) { res.json({ error: err }); }
    if (!user) { 
      return res.status(404).send({ 
        msg: "Incorrect username or password"
      }).end()
    }
    else {
      req.logIn(user, (err) => {
        if (err) { return console.log(err); }
        return res.json(user);
      });
    }
  })(req, res, next)
};

// logout user
exports.logout = (req, res, next) => {
  console.log("---logout---")
  req.logout();
  req.session.destroy();
};