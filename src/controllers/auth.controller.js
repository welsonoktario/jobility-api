const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secretKey = process.env.SECRET_KEY;

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

    const { fullname } = user;

    const token = jwt.sign({ fullname }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: 'ok',
      token,
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

    await userService.create({
      fullname,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ fullname }, secretKey, { expiresIn: '1h' });

    res.status(200).json({
      status: 'ok',
      token,
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
