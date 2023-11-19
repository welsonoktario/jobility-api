const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { exclude } = require('../utils');

const secretKey = process.env.JWT_SECRET;

async function check(req, res) {
  try {
    if (!req.headers.authorization) {
      return res.status(200).json({
        status: 'ok',
        data: null,
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, secretKey);

    return res.status(200).json({
      status: 'ok',
      data: user,
    });
  } catch (err) {
    console.error(err);

    return res.status(200).json({
      status: 'ok',
      data: null,
      message: err.message,
    });
  }
}

// Pindahin logic ini ke service? (ex: auth.service.js)
async function login(req, res) {
  try {
    const { email, password } = req.body;

    let user = await userService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid Credential');
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw new Error('Invalid Credential');
    }

    user = exclude(user, ['password', 'createdAt', 'updatedAt', 'deletedAt']);
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: 'ok',
      data: {
        user,
        token,
      },
      token,
    });
  } catch (err) {
    console.error(err);
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
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
}

module.exports = {
  check,
  login,
  register,
};
