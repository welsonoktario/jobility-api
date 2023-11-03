const authenticated = require('./authenticated.middleware');
const verifyJwt = require('./verify-jwt.middleware');

module.exports = {
  authenticated,
  verifyJwt,
};
