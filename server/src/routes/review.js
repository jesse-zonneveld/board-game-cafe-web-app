/**
 * @file routes/review.js
 * @author Jesse Zonneveld
 * @description Review routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import Router from 'express-promise-router';
import reviewController from '../controllers/review';
import { tokenCheck } from '../middleware/passport';

const router = new Router();

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */

// Create Review
router.post('/:id/create-review', tokenCheck, reviewController.createReview);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default router;

/* -------------------------------------------------------------------------- */
