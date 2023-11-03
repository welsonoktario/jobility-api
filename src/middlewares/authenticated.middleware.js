function authenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send('Not authenticated');
  }
  next();
}

module.exports = authenticated;
