const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secretKey = process.env.SECRET_KEY;

/* async function check(req, res) {
  const user = jwt.verify(req.header.Authorization, process.env.JWT_SECRET);
} */

// Pindahin logic ini ke service? (ex: auth.service.js)
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid Credential');
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw new Error('Invalid Credential');
    }

    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: 'ok',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
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

    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: 'ok',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

module.exports = {
  // check,
  login,
  register,
};
