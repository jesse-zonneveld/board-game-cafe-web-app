/**
 * @file controllers/restaurant.js
 * @author Jesse Zonneveld
 * @description Restaurant controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

// const errorHandler from '../errors/errorHandlerOld');
import Api404Error from '../errors/api404Error';
import { Restaurant, Review } from '../models/index';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ----------------------- RESTAURANT CONTROLLER CLASS ---------------------- */

class RestaurantsController {
    getAllRestaurants = async (req, res, next) => {
        logger.debug('Start of getAllRestaurants controller');

        try {
            const restaurants = await Restaurant.find();

            if (!restaurants) {
                throw new Api404Error('No restaurants found.');
            }

            logger.info(`Found ${restaurants.length} restaurants`);

            await Promise.all(
                restaurants.map(async (rest) => {
                    const averageRatingAgg = await Review.aggregate([
                        { $match: { restaurant_id: rest._id.toString() } },
                        {
                            $group: {
                                _id: '$restaurant_id',
                                average: { $avg: '$rating' },
                            },
                        },
                    ]);

                    if (averageRatingAgg[0]) {
                        rest.set('averageRating', averageRatingAgg[0].average, {
                            strict: false,
                        });

                        logger.info(
                            `Added averageRating of ${averageRatingAgg[0].average} to restaurant ${rest._id}`
                        );
                    }
                })
            );

            logger.info('All restaurants aggregated with average ratings');

            res.status(200).json({
                success: true,
                dataCount: restaurants.length,
                data: restaurants,
            });
        } catch (err) {
            next(err);
        }
    };

    getSingleRestaurant = async (req, res, next) => {
        logger.debug('Start of getSingleRestaurant controller');

        try {
            const restaurant = await Restaurant.findById(
                req.params.id
            ).populate('reviews');

            if (!restaurant) {
                throw new Api404Error(
                    `No restaurant found with id: ${req.params.id}.`
                );
            }

            logger.info(`Found restaurant ${restaurant._id}`);

            const averageRatingAgg = await Review.aggregate([
                { $match: { restaurant_id: restaurant._id.toString() } },
                {
                    $group: {
                        _id: '$restaurant_id',
                        average: { $avg: '$rating' },
                    },
                },
            ]);

            if (averageRatingAgg[0]) {
                restaurant.set('averageRating', averageRatingAgg[0].average, {
                    strict: false,
                });

                logger.info(
                    `Added averageRating of ${averageRatingAgg[0].average} to restaurant ${restaurant._id}`
                );
            }

            res.status(200).json({
                success: true,
                data: {
                    restaurant,
                },
            });
        } catch (err) {
            next(err);
        }
    };

    createRestaurant = async (req, res, next) => {
        logger.debug('Start of createRestaurant controller');

        try {
            const restaurant = await Restaurant.create(req.body);

            logger.info(`Restaurant created - ${restaurant._id}`);

            res.status(201).json({
                success: true,
                data: restaurant,
            });
        } catch (err) {
            next(err);
        }
    };

    updateRestaurant = async (req, res, next) => {
        logger.debug('Start of updateRestaurant controller');

        try {
            const { id } = req.params;

            const restaurant = new Restaurant(req.body);
            await restaurant.validate();

            logger.info(`Restaurant updated values are valid - ${req.body}`);

            const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, {
                name: restaurant.name,
                location: restaurant.location,
                price: restaurant.price,
            });

            if (!updatedRestaurant) {
                throw new Api404Error(`No restaurant found with id: ${id}.`);
            }

            logger.info(`Restaurant updated - ${updatedRestaurant._id}`);

            res.status(200).json({
                success: true,
                data: restaurant,
            });
        } catch (err) {
            next(err);
        }
    };

    deleteRestaurant = async (req, res, next) => {
        logger.debug('Start of deleteRestaurant controller');

        try {
            const { id } = req.params;
            const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

            if (!deletedRestaurant) {
                throw new Api404Error(`No restaurant found with id: ${id}.`);
            }

            logger.info(`Restaurant deleted - ${deletedRestaurant._id}`);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new RestaurantsController();

/* -------------------------------------------------------------------------- */
