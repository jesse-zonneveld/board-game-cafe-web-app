"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api404Error = _interopRequireDefault(require("../errors/api404Error"));

var _index = require("../models/index");

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/* ----------------------- RESTAURANT CONTROLLER CLASS ---------------------- */
class RestaurantsController {
  constructor() {
    _defineProperty(this, "getAllRestaurants", async (req, res, next) => {
      _logger.logger.debug('Start of getAllRestaurants controller');

      try {
        const restaurants = await _index.Restaurant.find();

        if (!restaurants) {
          throw new _api404Error.default('No restaurants found.');
        }

        _logger.logger.info(`Found ${restaurants.length} restaurants`);

        await Promise.all(restaurants.map(async rest => {
          const averageRatingAgg = await _index.Review.aggregate([{
            $match: {
              restaurant_id: rest._id.toString()
            }
          }, {
            $group: {
              _id: '$restaurant_id',
              average: {
                $avg: '$rating'
              }
            }
          }]);

          if (averageRatingAgg[0]) {
            rest.set('averageRating', averageRatingAgg[0].average, {
              strict: false
            });

            _logger.logger.info(`Added averageRating of ${averageRatingAgg[0].average} to restaurant ${rest._id}`);
          }
        }));

        _logger.logger.info('All restaurants aggregated with average ratings');

        res.status(200).json({
          success: true,
          dataCount: restaurants.length,
          data: restaurants
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "getSingleRestaurant", async (req, res, next) => {
      _logger.logger.debug('Start of getSingleRestaurant controller');

      try {
        const restaurant = await _index.Restaurant.findById(req.params.id).populate('reviews');

        if (!restaurant) {
          throw new _api404Error.default(`No restaurant found with id: ${req.params.id}.`);
        }

        _logger.logger.info(`Found restaurant ${restaurant._id}`);

        const averageRatingAgg = await _index.Review.aggregate([{
          $match: {
            restaurant_id: restaurant._id.toString()
          }
        }, {
          $group: {
            _id: '$restaurant_id',
            average: {
              $avg: '$rating'
            }
          }
        }]);

        if (averageRatingAgg[0]) {
          restaurant.set('averageRating', averageRatingAgg[0].average, {
            strict: false
          });

          _logger.logger.info(`Added averageRating of ${averageRatingAgg[0].average} to restaurant ${restaurant._id}`);
        }

        res.status(200).json({
          success: true,
          data: {
            restaurant
          }
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "createRestaurant", async (req, res, next) => {
      _logger.logger.debug('Start of createRestaurant controller');

      try {
        const restaurant = await _index.Restaurant.create(req.body);

        _logger.logger.info(`Restaurant created - ${restaurant._id}`);

        res.status(201).json({
          success: true,
          data: restaurant
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "updateRestaurant", async (req, res, next) => {
      _logger.logger.debug('Start of updateRestaurant controller');

      try {
        const {
          id
        } = req.params;
        const restaurant = new _index.Restaurant(req.body);
        await restaurant.validate();

        _logger.logger.info(`Restaurant updated values are valid - ${req.body}`);

        const updatedRestaurant = await _index.Restaurant.findByIdAndUpdate(id, {
          name: restaurant.name,
          location: restaurant.location,
          price: restaurant.price
        });

        if (!updatedRestaurant) {
          throw new _api404Error.default(`No restaurant found with id: ${id}.`);
        }

        _logger.logger.info(`Restaurant updated - ${updatedRestaurant._id}`);

        res.status(200).json({
          success: true,
          data: restaurant
        });
      } catch (err) {
        next(err);
      }
    });

    _defineProperty(this, "deleteRestaurant", async (req, res, next) => {
      _logger.logger.debug('Start of deleteRestaurant controller');

      try {
        const {
          id
        } = req.params;
        const deletedRestaurant = await _index.Restaurant.findByIdAndDelete(id);

        if (!deletedRestaurant) {
          throw new _api404Error.default(`No restaurant found with id: ${id}.`);
        }

        _logger.logger.info(`Restaurant deleted - ${deletedRestaurant._id}`);

        res.status(204).json();
      } catch (err) {
        next(err);
      }
    });
  }

}
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */


var _default = new RestaurantsController();
/* -------------------------------------------------------------------------- */


exports.default = _default;