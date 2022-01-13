"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatusCodes = _interopRequireDefault(require("./httpStatusCodes"));

var _baseError = _interopRequireDefault(require("./baseError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file error/api404Error.js
 * @author Jesse Zonneveld
 * @description Error class for 404 errors
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* ------------------------------- ERROR CLASS ------------------------------ */
class Api404Error extends _baseError.default {
  constructor(message = 'Not found.', name = 'NotFoundError', statusCode = _httpStatusCodes.default.NOT_FOUND, isOperational = true) {
    super(message, name, statusCode, isOperational);
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = Api404Error;
/* -------------------------------------------------------------------------- */

exports.default = _default;