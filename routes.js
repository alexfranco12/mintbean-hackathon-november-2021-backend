module.exports = function (app) {

  /*
    * -------------- ROUTES ---------------- 
  */

  app.use('/', require('./routes/root.route'));
  app.use('/api/users', require('./routes/users.route'));
};