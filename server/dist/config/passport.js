"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../models/user"));

var _env = _interopRequireDefault(require("./env"));

var _logger = require("../utils/logger");

var _api403Error = _interopRequireDefault(require("../errors/api403Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file config/passport.js
 * @author Jesse Zonneveld
 * @description Passport configuration
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* --------------------------- CONFIGURE FUNCTION --------------------------- */
const configurePassport = app => {
  // ? Are serialize and deserialize just for sessions? Is this needed?
  _passport.default.serializeUser((user, done) => {
    if (user.password) {
      delete user.password;
    }

    done(null, user);
  });

  _passport.default.deserializeUser((user, done) => done(null, user)); // Extracts cookies from request


  const cookieExtractor = req => {
    _logger.logger.info(`Extracting cookies from req: ${req.cookies}`);

    let token = null;

    if (req && req.cookies) {
      token = req.cookies.access_token;
    }

    return token;
  }; // JWT Strategy for authorization


  _passport.default.use(new _passportJwt.Strategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: _env.default.JWTSecret
  }, async (payload, done) => {
    try {
      // ? This makes auth stateful, may want to change?
      const user = await _user.default.findById({
        _id: payload.userID
      });

      if (user && !user.banned) {
        _logger.logger.info(`User is authorized - ${user.email}`);

        done(null, user);
      } else {
        throw new _api403Error.default(`User: ${user.username} is banned.`);
      }
    } catch (err) {
      done(err);
    }
  })); // Stateless Auth
  // passport.use(new JWTStrategy({
  //     jwtFromRequest: cookieExtractor,
  //     secretOrKey: process.env.JWT_SECRET
  // }, async (payload, done) => {
  //     console.log("inside JWT Strategy");
  //     try {
  //         done(null, payload);
  //     } catch (err) {
  //         done(err);
  //     }
  // }));
  // Local Strategy for authentication


  _passport.default.use('local', new _passportLocal.Strategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      const user = await _user.default.findOne({
        email
      });

      if (user && (await user.comparePassword(password))) {
        if (user.password) {
          delete user.password;
        }

        _logger.logger.info(`User is authenticated - ${user.email}`);

        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  }));

  app.use(_passport.default.initialize());
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = configurePassport;
/* -------------------------------------------------------------------------- */

exports.default = _default;