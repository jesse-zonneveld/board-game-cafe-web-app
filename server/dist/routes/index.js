"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _restaurant = _interopRequireDefault(require("./restaurant"));

var _review = _interopRequireDefault(require("./review"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file routes/index.js
 * @author Jesse Zonneveld
 * @description Routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

/* ------------------------ COMBINED ROUTER FUNCTION ------------------------ */
const combineRouters = app => {
  app.use('/api/v1/auth', _auth.default);
  app.use('/api/v1/restaurants', _restaurant.default);
  app.use('/api/v1/reviews', _review.default);
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = combineRouters;
/* -------------------------------------------------------------------------- */

exports.default = _default;