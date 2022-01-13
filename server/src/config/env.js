/**
 * @file config/env.js
 * @author Jesse Zonneveld
 * @description Environment variables configuration
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import dotenv from 'dotenv';

dotenv.config();

/* -------------------------------------------------------------------------- */

/* ------------------------------ CONFIG OBJECT ----------------------------- */

const config = {
    JWTSecret: process.env.JWT_SECRET,
    JWTExpires: process.env.JWT_EXPIRES,
    JWTRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
    mongoDBURI: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default config;

/* -------------------------------------------------------------------------- */
