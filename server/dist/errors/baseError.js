"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file error/baseError.js
 * @author Jesse Zonneveld
 * @description Base error class for custom errors
 */

/* ------------------------------- ERROR CLASS ------------------------------ */
class BaseError extends Error {
  constructor(message, name, statusCode, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = BaseError;
/* -------------------------------------------------------------------------- */

exports.default = _default;