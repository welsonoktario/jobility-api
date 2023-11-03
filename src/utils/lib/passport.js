const passport = require('passport');
const { jwtStrategy, localStrategy } = require('./auth-strategies');
const { userService } = require('../../services');

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser((user, done) => {
  if (user) {
    done(null, user.id);
  }
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.find(id);
  done(null, user);
});

module.exports = passport;
