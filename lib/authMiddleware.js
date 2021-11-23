module.exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({
      msg: "you are not authorized to view this resource"
    })} 
  else next();
}

module.exports.isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() && req.user.admin) {
    res.status(401).json({
      msg: "you are not authorized to view this resource because you are not an admin"
    })} 
  else next();
}