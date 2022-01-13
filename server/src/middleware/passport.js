/**
 * @file middleware/passport.js
 * @author Jesse Zonneveld
 * @description Passport middleware
 */

/* --------------------------------- IMPORTS -------------------------------- */

import passport from 'passport';
import Api403Error from '../errors/api403Error';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* -------------------------- TOKEN CHECK FUNCTION -------------------------- */

const tokenCheck = (req, res, next) => {
    try {
        passport.authenticate('jwt', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (info) {
                throw new Api403Error(info.message, info.name);
            }

            if (!user) {
                throw new Api403Error('User not found from token check.');
            }

            logger.info('JWT token is valid');

            req.user = user;
            return next();
        })(req, res, next);
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */

/* ----------------------- CREDENTIALS CHECK FUNCTION ----------------------- */

const credCheck = (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (info) {
                throw new Api403Error(info.message, info.name);
            }

            if (!user) {
                throw new Api403Error('user or password is incorrect.');
            }

            logger.info('Credentials are valid');

            req.user = user;
            return next();
        })(req, res, next);
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { tokenCheck, credCheck };

/* -------------------------------------------------------------------------- */
