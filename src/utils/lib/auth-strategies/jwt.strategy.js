const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const { userService } = require('../../../services');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

// eslint-disable-next-line camelcase
const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await userService.find(jwtPayload.id);

    if (user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = jwtStrategy;
