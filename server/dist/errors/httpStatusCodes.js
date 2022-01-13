"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file error/httpStatusCodes.js
 * @author Jesse Zonneveld
 * @description Status codes for http responses
 */

/* -------------------------------- CONSTANTS ------------------------------- */
const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = httpStatusCodes;
/* -------------------------------------------------------------------------- */

exports.default = _default;