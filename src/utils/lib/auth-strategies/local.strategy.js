const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { userService } = require('../../../services');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, cb) => {
    try {
      const user = await userService.findByEmail(username);

      if (!user) {
        return cb(null, false, { message: 'Incorrect enmail or password.' });
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        return cb(null, false, { message: 'Incorrect enmail or password.' });
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  },
);

module.exports = localStrategy;
