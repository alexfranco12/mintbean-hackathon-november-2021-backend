module.exports = function (app) {
  // ROUTES
  app.use('/', require('./routes/root.route'));
  app.use('/user', require('./routes/users.route'));
};