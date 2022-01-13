"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credCheck = exports.tokenCheck = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _api403Error = _interopRequireDefault(require("../errors/api403Error"));

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file middleware/passport.js
 * @author Jesse Zonneveld
 * @description Passport middleware
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* -------------------------- TOKEN CHECK FUNCTION -------------------------- */
const tokenCheck = (req, res, next) => {
  try {
    _passport.default.authenticate('jwt', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (info) {
        throw new _api403Error.default(info.message, info.name);
      }

      if (!user) {
        throw new _api403Error.default('User not found from token check.');
      }

      _logger.logger.info('JWT token is valid');

      req.user = user;
      return next();
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};
/* -------------------------------------------------------------------------- */

/* ----------------------- CREDENTIALS CHECK FUNCTION ----------------------- */


exports.tokenCheck = tokenCheck;

const credCheck = (req, res, next) => {
  try {
    _passport.default.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (info) {
        throw new _api403Error.default(info.message, info.name);
      }

      if (!user) {
        throw new _api403Error.default('user or password is incorrect.');
      }

      _logger.logger.info('Credentials are valid');

      req.user = user;
      return next();
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */


exports.credCheck = credCheck;