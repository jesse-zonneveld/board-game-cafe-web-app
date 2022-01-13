"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatusCodes = _interopRequireDefault(require("./httpStatusCodes"));

var _baseError = _interopRequireDefault(require("./baseError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file error/api403Error.js
 * @author Jesse Zonneveld
 * @description Error class for 403 errors
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* ------------------------------- ERROR CLASS ------------------------------ */
class Api403Error extends _baseError.default {
  constructor(message = 'Not authorized.', name = 'AuthorizationError', statusCode = _httpStatusCodes.default.FORBIDDEN, isOperational = true) {
    super(message, name, statusCode, isOperational);
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = Api403Error;
/* -------------------------------------------------------------------------- */

exports.default = _default;