const router = require('express').Router();
const passport = require('passport');
const { isAuth, isAdmin } = require('../lib/authMiddleware');

var userController = require('../controllers/userController')
const User = require('../models/user-model');

/*
 * -------------- USER ROUTES ----------------
*/

// todo: incorperate middleware to protect routes
router.get('/', userController.index);
router.get('/me', isAuth, userController.user_data);
router.get('/me/:id', userController.user_profile);
router.get('/logout', userController.logout);
router.post('/register', userController.user_create);
router.post('/login', userController.user_login);
router.patch('/me/:id/addImage', 
  userController.user_saveImage);

// todo: login success and failure routes
router.get('/login-success', (req, res, next) => {});
router.get('/login-failure', (req, res, next) => {});

module.exports = router;