"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _restaurant = _interopRequireDefault(require("./restaurant"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file models/review.js
 * @author Jesse Zonneveld
 * @description Review model
 */

/* ----------------------------- IMPORTS & SETUO ---------------------------- */
const {
  Schema
} = _mongoose.default;
/* -------------------------------------------------------------------------- */

/* -------------------------- VALIDATION FUNCTIONS -------------------------- */

const validatedUser = (username, cb) => {
  console.log('inside validateUser in Review Modal');

  _user.default.findOne({
    username
  }, (err, user) => {
    if (err) {
      console.log(err);
    }

    cb(typeof user !== 'undefined' && user !== null);
  });
};

const validatedRestaurantID = (_id, cb) => {
  console.log('inside validateRestaurant in Review Modal');

  _restaurant.default.findOne({
    _id
  }, (err, restaurant) => {
    if (err) {
      console.log(err);
    }

    cb(typeof restaurant !== 'undefined' && restaurant !== null);
  });
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */


const reviewSchema = new Schema({
  restaurant_id: {
    type: String,
    required: [true, 'No review restaurant_id attached.'],
    validate: {
      isAsync: true,
      validator: validatedRestaurantID,
      message: "Review restaurant_id doesn't exist."
    }
  },
  username: {
    type: String,
    required: [true, 'No review username attached.'],
    validate: {
      isAsync: true,
      validator: validatedUser,
      message: "Review username doesn't exist."
    }
  },
  rating: {
    type: Number,
    required: [true, 'No review rating entered.']
  },
  body: {
    type: String,
    required: [true, 'No review body entered.']
  }
}, {
  timestamps: true
});
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = _mongoose.default.model('Review', reviewSchema);
/* -------------------------------------------------------------------------- */


exports.default = _default;