/**
 * @file controllers/review.js
 * @author Jesse Zonneveld
 * @description Review controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

import Api403Error from '../errors/api403Error';
import Api404Error from '../errors/api404Error';
import { Restaurant, Review } from '../models/index';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ------------------------- REVIEW CONTROLLER CLASS ------------------------ */

class ReviewController {
    createReview = async (req, res, next) => {
        try {
            if (req.body.username !== req.user.username) {
                throw new Api403Error(
                    `Username of ${req.body.username} does not match the current req.user.`
                );
            }

            logger.info(
                `Username ${req.body.username} matches req.user.username ${req.user.username}`
            );

            const review = new Review({
                restaurant_id: req.params.id,
                ...req.body,
            });
            const restaurant = await Restaurant.findById(req.params.id);

            if (!restaurant) {
                throw new Api404Error(
                    `No restaurant found with id: ${req.params.id}.`
                );
            }

            logger.info(`Restaurant to add review found - ${restaurant._id}`);

            await restaurant.reviews.push(review);

            logger.info(
                `Review ${review._id} pushed to restaurant ${restaurant._id}`
            );

            await restaurant.save();

            logger.info(`Restaurant saved - ${restaurant._id}`);

            const savedReview = await review.save();

            logger.info(`Review saved - ${restaurant._id}`);

            res.status(201).json({
                success: true,
                data: savedReview,
            });
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new ReviewController();

/* -------------------------------------------------------------------------- */
