"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file models/restaurant.js
 * @author Jesse Zonneveld
 * @description Restaurant model
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
const {
  Schema
} = _mongoose.default;
/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'No restaurant name entered.']
  },
  location: {
    type: String,
    required: [true, 'No restaurant location entered.']
  },
  price: {
    type: String,
    required: [true, 'No restaurant price entered.']
  },
  reviews: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = _mongoose.default.model('Restaurant', restaurantSchema);
/* -------------------------------------------------------------------------- */


exports.default = _default;