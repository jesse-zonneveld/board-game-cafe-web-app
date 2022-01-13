/**
 * @file routes/index.js
 * @author Jesse Zonneveld
 * @description Routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

import authRouter from './auth';
import restaurantsRouter from './restaurant';
import boardGameRouter from './boardGame';
import reviewRouter from './review';

/* -------------------------------------------------------------------------- */

/* ------------------------ COMBINED ROUTER FUNCTION ------------------------ */

const combineRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/restaurants', restaurantsRouter);
    app.use('/api/v1/board-games', boardGameRouter);
    app.use('/api/v1/reviews', reviewRouter);
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default combineRouters;

/* -------------------------------------------------------------------------- */
