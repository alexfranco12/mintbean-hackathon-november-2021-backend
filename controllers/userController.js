const User = require("../models/user-model");
const passport = require('passport')

/*
*  USER CONTROLLERS
*/

// READ: display list of all users
exports.index = (req, res) => {
  User.find({})
    .then((err, users) => {
      res.status("200").send({
        status: "ok"
      })
    })
};