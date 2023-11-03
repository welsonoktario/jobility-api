const passport = require('passport');
const { jwtStrategy, localStrategy } = require('./auth-strategies');
const { userService } = require('../../services');

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = userService.find(id);
  done(null, user);
});

module.exports = passport;
