const createError = require('http-errors');
const constants = require('../constants');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else throw createError(403);
}

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) next();
    else throw createError(401);
  }
}
