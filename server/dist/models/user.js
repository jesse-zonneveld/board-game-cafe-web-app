"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = require("validator");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file models/user.js
 * @author Jesse Zonneveld
 * @description User model
 */

/* ----------------------------- IMPORTS &SETUP ----------------------------- */
const {
  Schema
} = _mongoose.default;
/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'No username entered.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'No email entered.'],
    unique: true,
    lowercase: true,
    validate: [_validator.isEmail, 'Invalid email format.']
  },
  password: {
    type: String,
    required: [true, 'No password entered.'],
    minlength: [8, 'Password must have atleast 8 characters.']
  },
  banned: {
    type: Boolean,
    required: [true, 'No banned restrictions given.'],
    default: false
  }
}, {
  timestamps: true
});
/* -------------------------------------------------------------------------- */

/* ---------------------------- SCHEMA FUNCTIONS ---------------------------- */
// mongoose hook to hash password before saving

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await _bcrypt.default.genSalt();
  this.password = await _bcrypt.default.hash(this.password, salt);
  return next();
}); // mongoose hook to add banned restrictions before saving

userSchema.pre('save', async function (next) {
  this.banned = false;
  return next();
}); // // example mongoose hook for after save
// userSchema.post('save', (doc, next) => {
//     console.log('new user was created', doc);
//     next();
// });

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await _bcrypt.default.compare(password, this.password);
  return isMatch;
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = _mongoose.default.model('User', userSchema);
/* -------------------------------------------------------------------------- */


exports.default = _default;