"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api403Error = _interopRequireDefault(require("../errors/api403Error"));

var _api404Error = _interopRequireDefault(require("../errors/api404Error"));

var _index = require("../models/index");

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/* ------------------------- REVIEW CONTROLLER CLASS ------------------------ */
class ReviewController {
  constructor() {
    _defineProperty(this, "createReview", async (req, res, next) => {
      try {
        if (req.body.username !== req.user.username) {
          throw new _api403Error.default(`Username of ${req.body.username} does not match the current req.user.`);
        }

        _logger.logger.info(`Username ${req.body.username} matches req.user.username ${req.user.username}`);

        const review = new _index.Review({
          restaurant_id: req.params.id,
          ...req.body
        });
        const restaurant = await _index.Restaurant.findById(req.params.id);

        if (!restaurant) {
          throw new _api404Error.default(`No restaurant found with id: ${req.params.id}.`);
        }

        _logger.logger.info(`Restaurant to add review found - ${restaurant._id}`);

        await restaurant.reviews.push(review);

        _logger.logger.info(`Review ${review._id} pushed to restaurant ${restaurant._id}`);

        await restaurant.save();

        _logger.logger.info(`Restaurant saved - ${restaurant._id}`);

        const savedReview = await review.save();

        _logger.logger.info(`Review saved - ${restaurant._id}`);

        res.status(201).json({
          success: true,
          data: savedReview
        });
      } catch (err) {
        next(err);
      }
    });
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = new ReviewController();
/* -------------------------------------------------------------------------- */


exports.default = _default;