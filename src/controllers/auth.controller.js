const bcrypt = require('bcrypt');
const { userService } = require('../services');

// Pindahin logic ini ke service? (ex: auth.service.js)
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);
    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      res.status(200).json({
        status: 'fail',
        msg: 'Wrong email or password',
      });
    }

    res.status(200).json({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

// Pindahin logic ini ke service? (ex: auth.service.js)
async function register(req, res) {
  try {
    const { fullname, email, password } = req.body;

    const exists = await userService.findByEmail(email);

    if (exists) {
      throw new Error('Email has already been used');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await userService.create({
      fullname,
      email,
      password: passwordHash,
    });

    res.status(200).json({
      status: 'ok',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      msg: err.message,
    });
  }
}

module.exports = {
  login,
  register,
};
