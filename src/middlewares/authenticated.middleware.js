function authenticated(req, res, next) {
  if (!req.user) {
    return res.render('home');
  }
  next();
}

module.exports = authenticated;
