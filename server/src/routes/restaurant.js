/**
 * @file routes/restaurant.js
 * @author Jesse Zonneveld
 * @description Restaurant routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import Router from 'express-promise-router';
import restaurantsController from '../controllers/restaurant';
import { tokenCheck } from '../middleware/passport';

const router = new Router();

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */

// Get All Restaurants
router.get('/', restaurantsController.getAllRestaurants);

// Get Single Restaurant
router.get('/:id', tokenCheck, restaurantsController.getSingleRestaurant);

// Create Restaurant
router.post('/', tokenCheck, restaurantsController.createRestaurant);

// Update Restaurant
router.put('/:id', tokenCheck, restaurantsController.updateRestaurant);

// Delete Restaurant
router.delete('/:id', tokenCheck, restaurantsController.deleteRestaurant);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default router;

/* -------------------------------------------------------------------------- */
