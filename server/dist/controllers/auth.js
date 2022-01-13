"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("../models/index");

var _helpers = require("./helpers");

var _env = _interopRequireDefault(require("../config/env"));

var _api403Error = _interopRequireDefault(require("../errors/api403Error"));

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/* -------------------------- AUTH CONTROLLER CLASS ------------------------- */
class AuthController {
  constructor() {
    _defineProperty(this, "createUser", async (req, res, next) => {
      _logger.logger.debug('Start of createUser controller');

      try {
        const user = await _index.User.create(req.body);

        _logger.logger.info(`New user created: ${user.username} - ${user.email} - ${user._id}`);

        res.status(201).json({
          success: true,
          data: user
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "refreshAccessAndRefreshTokens", async (req, res, next) => {
      _logger.logger.debug('Start of refreshAccessAndRefreshTokens controller');

      const refreshTokenID = (0, _helpers.cookieExtractor)(req).refreshToken;

      try {
        if (!refreshTokenID) {
          throw new _api403Error.default('No refresh token found.');
        }

        _logger.logger.info(`Refresh token ID ${refreshTokenID} found in cookies`);

        const refreshToken = await _index.RefreshToken.findOne({
          token: refreshTokenID
        }).populate('user');

        if (!refreshToken) {
          throw new _api403Error.default('Refresh token not in db.');
        }

        _logger.logger.info('Refresh token found in db');

        if (_index.RefreshToken.verifyExpiration(refreshToken)) {
          _index.RefreshToken.findByIdAndRemove(refreshToken._id, {
            useFindAndModify: false
          }).exec();

          _logger.logger.info(`Expired refresh token removed from db - ${refreshTokenID}`);

          throw new _api403Error.default('Refresh token is expired.');
        }

        _logger.logger.info(`Refresh token ${refreshTokenID} expiry date verified`);

        const newAccessToken = (0, _helpers.signToken)(refreshToken.user._id, refreshToken.user.email);

        _logger.logger.info(`New access token created and signed - ${newAccessToken}`); // Use secure cookies when not in Dev mode, postman won't send otherwise


        if (_env.default.nodeEnv === 'development') {
          res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            sameSite: 'strict'
          });
        } else {
          res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true
          });
        }

        _logger.logger.info(`New access token attached as cookie - ${newAccessToken}`);

        res.status(200).json({
          isAuthenticated: true,
          user: {
            username: refreshToken.user.username,
            email: refreshToken.user.email
          }
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "loginUser", async (req, res, next) => {
      _logger.logger.debug('Start of loginUser controller');

      try {
        if (req.isAuthenticated()) {
          const {
            _id,
            username,
            email
          } = req.user;
          const accessToken = (0, _helpers.signToken)(_id, email);
          const refreshToken = await _index.RefreshToken.createToken(req.user); // Use secure cookies when not in Dev mode, postman won't send otherwise

          if (_env.default.nodeEnv === 'development') {
            res.cookie('access_token', accessToken, {
              httpOnly: true,
              sameSite: 'strict'
            });
            res.cookie('refresh_token', refreshToken, {
              httpOnly: true,
              sameSite: 'strict',
              path: '/api/v1/auth'
            });
          } else {
            res.cookie('access_token', accessToken, {
              httpOnly: true,
              sameSite: 'strict',
              secure: true
            });
            res.cookie('refresh_token', refreshToken, {
              httpOnly: true,
              sameSite: 'strict',
              secure: true
            });
          }

          _logger.logger.info(`Access token attached as cookie - ${accessToken}`);

          _logger.logger.info(`Refresh token attached as cookie - ${refreshToken}`);

          res.status(200).json({
            isAuthenticated: true,
            user: {
              username,
              email
            }
          });
        }
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "logoutUser", async (req, res, next) => {
      _logger.logger.debug('Start of logout controller');

      try {
        const {
          userID
        } = req.body;
        const userRefreshTokens = await _index.RefreshToken.find({
          user: userID
        });

        _logger.logger.info(`Found ${userRefreshTokens.length} refresh tokens in db for ${userID}`); // Delete all refresh tokens


        if (userRefreshTokens) {
          await Promise.all(userRefreshTokens.map(async token => {
            await _index.RefreshToken.findByIdAndDelete(token._id);

            _logger.logger.info(`Refresh token ${token._id} deleted from db`);
          }));
        }

        res.clearCookie('refresh_token', {
          path: '/api/v1/auth'
        });
        res.clearCookie('access_token');

        _logger.logger.info('refresh token and access tokens cleared');

        _logger.logger.info(`user with id ${userID} logged out`);

        res.status(200).json({
          success: true,
          user: {
            username: '',
            email: ''
          }
        });
      } catch (err) {
        next(err);
      }
    });
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = new AuthController();
/* -------------------------------------------------------------------------- */


exports.default = _default;