"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file config/env.js
 * @author Jesse Zonneveld
 * @description Environment variables configuration
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
_dotenv.default.config();
/* -------------------------------------------------------------------------- */

/* ------------------------------ CONFIG OBJECT ----------------------------- */


const config = {
  JWTSecret: process.env.JWT_SECRET,
  JWTExpires: process.env.JWT_EXPIRES,
  JWTRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
  mongoDBURI: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = config;
/* -------------------------------------------------------------------------- */

exports.default = _default;