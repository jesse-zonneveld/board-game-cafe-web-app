/**
 * @file controllers/helpers.js
 * @author Jesse Zonneveld
 * @description Helper functions for controllers
 */

/* --------------------------------- IMPORTS -------------------------------- */

import JWT from 'jsonwebtoken';
import env from '../config/env';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ---------------------------- HELPER FUNCTIONS ---------------------------- */

const signToken = (userID, userEmail) => {
    logger.info(`Creating signed JWT token - ${userID}, ${userEmail}`);

    return JWT.sign(
        {
            userID,
            userEmail,
        },
        env.JWTSecret,
        { expiresIn: `${env.JWTExpires}s` }
    );
};

const cookieExtractor = (req) => {
    logger.info(`Extracting cookies from req: ${req.cookies}`);

    let accessToken = null;
    let refreshToken = null;

    if (req && req.cookies) {
        accessToken = req.cookies.access_token;
        refreshToken = req.cookies.refresh_token;
    }

    return { accessToken, refreshToken };
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { signToken, cookieExtractor };

/* -------------------------------------------------------------------------- */
