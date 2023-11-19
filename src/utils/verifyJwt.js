const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: 'Access denied, invalid token' });
  }

  if (decoded) {
    return next();
  }

  return res.status(400).json({ message: 'Invalid token' });
}

module.exports = verifyToken;
