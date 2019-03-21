const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const admins = process.env.ADMIN_EMAILS.split(',').trim() || ["admin@example.org"];
const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required',
    trim: true
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    lowercase: true,
    trim: true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
  password: {
    type: String,
    required: 'Password is required',
    match: [PASSWORD_PATTERN, 'Passwords must contain at least six characters, including uppercase, lowercase letters and numbers.']
  },
  role: {
    type: String,
    enum: constants.roles,
    default: constants.defaultRole,
    required: 'Role is required'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', function (next) {
  const user = this;

  user.role = admins.some(email => user.email === email) ? 
    constants.adminRole : 
    constants.defaultRole;

  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(next)
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
