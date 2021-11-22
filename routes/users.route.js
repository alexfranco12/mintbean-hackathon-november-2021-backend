const express = require('express');
const router = new express.Router();
const passport = require('passport')

var userController = require('../controllers/userController');
const User = require('../models/user-model');

/*
*  USER ROUTES
*/

// Showing home page
router.get("/", userController.index);

module.exports = router;