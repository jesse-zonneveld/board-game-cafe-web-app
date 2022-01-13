"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookieExtractor = exports.signToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../config/env"));

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file controllers/helpers.js
 * @author Jesse Zonneveld
 * @description Helper functions for controllers
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* ---------------------------- HELPER FUNCTIONS ---------------------------- */
const signToken = (userID, userEmail) => {
  _logger.logger.info(`Creating signed JWT token - ${userID}, ${userEmail}`);

  return _jsonwebtoken.default.sign({
    userID,
    userEmail
  }, _env.default.JWTSecret, {
    expiresIn: `${_env.default.JWTExpires}s`
  });
};

exports.signToken = signToken;

const cookieExtractor = req => {
  _logger.logger.info(`Extracting cookies from req: ${req.cookies}`);

  let accessToken = null;
  let refreshToken = null;

  if (req && req.cookies) {
    accessToken = req.cookies.access_token;
    refreshToken = req.cookies.refresh_token;
  }

  return {
    accessToken,
    refreshToken
  };
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */


exports.cookieExtractor = cookieExtractor;