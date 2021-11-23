const mongoose = require("mongoose")
const connection = require("../config/database")

/*
 * -------------- USER SCHEMA ----------------
*/
const UserSchema = new mongoose.Schema({
  username: 
    {
      type: String, 
      lowercase: true, 
      unique: true, 
      required: [true, "can't be blank"], 
      match: [/^[A-Za-z0-9\-\_]+$/, 'is invalid'], 
      index: true
    },
  admin: 
    {
      type: Boolean, 
      default: false
    },
  savedImages: 
    {
      type: Array(),
      default: []
    },
  hash: String,
  salt: String,
}, {
  timestamps: true
});


const User = connection.model('User', UserSchema);
module.exports = User;