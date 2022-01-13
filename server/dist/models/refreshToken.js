"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

var _env = _interopRequireDefault(require("../config/env"));

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file models/refreshToken.js
 * @author Jesse Zonneveld
 * @description Refresh Token model
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
const {
  Schema
} = _mongoose.default;
/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: [true, 'No token string entered.']
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'No user ref for refresh token entered.']
  },
  expiryDate: {
    type: Date,
    required: [true, 'No ExpiryDate for refresh token entered.']
  }
});
/* -------------------------------------------------------------------------- */

/* ---------------------------- SCHEMA FUNCTIONS ---------------------------- */

refreshTokenSchema.statics.createToken = async function (user) {
  const token = (0, _uuid.v4)(); // Setup expiry date for new token

  const expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + +_env.default.JWTRefreshExpires);
  const refreshToken = new this({
    token,
    user: user._id,
    expiryDate: expiredAt.getTime()
  });
  const savedRefreshToken = await refreshToken.save();

  _logger.logger.info(`Refresh token created - ${token}`);

  return savedRefreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = token => {
  return token.expiryDate.getTime() < new Date().getTime();
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = _mongoose.default.model('RefreshToken', refreshTokenSchema);
/* -------------------------------------------------------------------------- */


exports.default = _default;