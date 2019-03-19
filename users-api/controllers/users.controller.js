const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) throw createError(404, 'User not found');
      else res.status(204).json();
    })
    .catch(next);
}
