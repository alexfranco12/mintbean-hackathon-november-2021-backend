const mongoose = require("../db/connection"),
  passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
  provider: 
    {
      type: String, 
      default: ''
    },
  displayName: 
    {
      type: String, 
      default: ''
    },
  firstName: 
    {
      type: String, 
      trim:true, 
      default:''
    },
  lastName: 
    {
      type: String, 
      default:''
    },
  username: 
    {
      type: String,
      lowercase: true, 
      required: [true, "can't be blank"], 
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
      index: true
    },
  email:
    {
      type: String,
      lowercase: true, 
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'], 
      index: true
    },
  hash: String,
  salt: String,
  artWorks:
    {
      type: Array, 
      default:undefined
    },
})

UserSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', UserSchema)
module.exports = User;