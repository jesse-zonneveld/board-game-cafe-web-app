/**
 * @file config/passport.js
 * @author Jesse Zonneveld
 * @description Passport configuration
 */

/* --------------------------------- IMPORTS -------------------------------- */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import User from '../models/user';
import env from './env';
import { logger } from '../utils/logger';
import Api403Error from '../errors/api403Error';

/* -------------------------------------------------------------------------- */

/* --------------------------- CONFIGURE FUNCTION --------------------------- */

const configurePassport = (app) => {
    // ? Are serialize and deserialize just for sessions? Is this needed?
    passport.serializeUser((user, done) => {
        if (user.password) {
            delete user.password;
        }
        done(null, user);
    });

    passport.deserializeUser((user, done) => done(null, user));

    // Extracts cookies from request
    const cookieExtractor = (req) => {
        logger.info(`Extracting cookies from req: ${req.cookies}`);

        let token = null;

        if (req && req.cookies) {
            token = req.cookies.access_token;
        }

        return token;
    };

    // JWT Strategy for authorization
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: cookieExtractor,
                secretOrKey: env.JWTSecret,
            },
            async (payload, done) => {
                try {
                    // ? This makes auth stateful, may want to change?
                    const user = await User.findById({
                        _id: payload.userID,
                    });

                    if (user && !user.banned) {
                        logger.info(`User is authorized - ${user.email}`);

                        done(null, user);
                    } else {
                        throw new Api403Error(
                            `User: ${user.username} is banned.`
                        );
                    }
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    // Stateless Auth
    // passport.use(new JWTStrategy({
    //     jwtFromRequest: cookieExtractor,
    //     secretOrKey: process.env.JWT_SECRET
    // }, async (payload, done) => {
    //     console.log("inside JWT Strategy");

    //     try {
    //         done(null, payload);
    //     } catch (err) {
    //         done(err);
    //     }
    // }));

    // Local Strategy for authentication
    passport.use(
        'local',
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email });

                    if (user && (await user.comparePassword(password))) {
                        if (user.password) {
                            delete user.password;
                        }

                        logger.info(`User is authenticated - ${user.email}`);

                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (err) {
                    done(err);
                }
            }
        )
    );

    app.use(passport.initialize());
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default configurePassport;

/* -------------------------------------------------------------------------- */
