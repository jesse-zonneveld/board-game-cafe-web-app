/**
 * @file models/refreshToken.js
 * @author Jesse Zonneveld
 * @description Refresh Token model
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import env from '../config/env';
import { logger } from '../utils/logger';

const { Schema } = mongoose;

/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'No token string entered.'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'No user ref for refresh token entered.'],
    },
    expiryDate: {
        type: Date,
        required: [true, 'No ExpiryDate for refresh token entered.'],
    },
});

/* -------------------------------------------------------------------------- */

/* ---------------------------- SCHEMA FUNCTIONS ---------------------------- */

refreshTokenSchema.statics.createToken = async function (user) {
    const token = uuidv4();

    // Setup expiry date for new token
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + +env.JWTRefreshExpires);

    const refreshToken = new this({
        token,
        user: user._id,
        expiryDate: expiredAt.getTime(),
    });

    const savedRefreshToken = await refreshToken.save();

    logger.info(`Refresh token created - ${token}`);

    return savedRefreshToken.token;
};

refreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default mongoose.model('RefreshToken', refreshTokenSchema);

/* -------------------------------------------------------------------------- */
