const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error_msg","Not Authorized");
  res.status(500).redirect("/users/singin");
};

module.exports = helpers;