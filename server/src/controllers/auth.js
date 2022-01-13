/**
 * @file controllers/auth.js
 * @author Jesse Zonneveld
 * @description Auth controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { User, RefreshToken } from '../models/index';
import { signToken, cookieExtractor } from './helpers';
import env from '../config/env';
import Api403Error from '../errors/api403Error';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* -------------------------- AUTH CONTROLLER CLASS ------------------------- */

class AuthController {
    createUser = async (req, res, next) => {
        logger.debug('Start of createUser controller');

        try {
            const user = await User.create(req.body);

            logger.info(
                `New user created: ${user.username} - ${user.email} - ${user._id}`
            );

            res.status(201).json({
                success: true,
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    refreshAccessAndRefreshTokens = async (req, res, next) => {
        logger.debug('Start of refreshAccessAndRefreshTokens controller');

        const refreshTokenID = cookieExtractor(req).refreshToken;

        try {
            if (!refreshTokenID) {
                throw new Api403Error('No refresh token found.');
            }

            logger.info(`Refresh token ID ${refreshTokenID} found in cookies`);

            const refreshToken = await RefreshToken.findOne({
                token: refreshTokenID,
            }).populate('user');

            if (!refreshToken) {
                throw new Api403Error('Refresh token not in db.');
            }

            logger.info('Refresh token found in db');

            if (RefreshToken.verifyExpiration(refreshToken)) {
                RefreshToken.findByIdAndRemove(refreshToken._id, {
                    useFindAndModify: false,
                }).exec();

                logger.info(
                    `Expired refresh token removed from db - ${refreshTokenID}`
                );

                throw new Api403Error('Refresh token is expired.');
            }

            logger.info(`Refresh token ${refreshTokenID} expiry date verified`);

            const newAccessToken = signToken(
                refreshToken.user._id,
                refreshToken.user.email
            );

            logger.info(
                `New access token created and signed - ${newAccessToken}`
            );

            // Use secure cookies when not in Dev mode, postman won't send otherwise
            if (env.nodeEnv === 'development') {
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                });
            } else {
                res.cookie('access_token', newAccessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                });
            }

            logger.info(
                `New access token attached as cookie - ${newAccessToken}`
            );

            res.status(200).json({
                isAuthenticated: true,
                user: {
                    username: refreshToken.user.username,
                    email: refreshToken.user.email,
                },
            });
        } catch (err) {
            next(err);
        }
    };

    loginUser = async (req, res, next) => {
        logger.debug('Start of loginUser controller');

        try {
            if (req.isAuthenticated()) {
                const { _id, username, email } = req.user;
                const accessToken = signToken(_id, email);
                const refreshToken = await RefreshToken.createToken(req.user);

                // Use secure cookies when not in Dev mode, postman won't send otherwise
                if (env.nodeEnv === 'development') {
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                    });
                    res.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        path: '/api/v1/auth',
                    });
                } else {
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: true,
                    });
                    res.cookie('refresh_token', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                        secure: true,
                    });
                }

                logger.info(`Access token attached as cookie - ${accessToken}`);
                logger.info(
                    `Refresh token attached as cookie - ${refreshToken}`
                );

                res.status(200).json({
                    isAuthenticated: true,
                    user: { username, email },
                });
            }
        } catch (err) {
            next(err);
        }
    };

    logoutUser = async (req, res, next) => {
        logger.debug('Start of logout controller');

        try {
            const { userID } = req.body;

            const userRefreshTokens = await RefreshToken.find({ user: userID });

            logger.info(
                `Found ${userRefreshTokens.length} refresh tokens in db for ${userID}`
            );

            // Delete all refresh tokens
            if (userRefreshTokens) {
                await Promise.all(
                    userRefreshTokens.map(async (token) => {
                        await RefreshToken.findByIdAndDelete(token._id);
                        logger.info(
                            `Refresh token ${token._id} deleted from db`
                        );
                    })
                );
            }

            res.clearCookie('refresh_token', { path: '/api/v1/auth' });
            res.clearCookie('access_token');

            logger.info('refresh token and access tokens cleared');
            logger.info(`user with id ${userID} logged out`);

            res.status(200).json({
                success: true,
                user: {
                    username: '',
                    email: '',
                },
            });
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new AuthController();

/* -------------------------------------------------------------------------- */
