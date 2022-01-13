/**
 * @file utils/logger.js
 * @author Jesse Zonneveld
 * @description Logger
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import config from '../config/env';

require('winston-mongodb');

/* -------------------------------------------------------------------------- */

/* ----------------------------- LOGGER FUNCTION ---------------------------- */

const logger = createLogger({
    transports: [
        // Production transports
        new transports.File({
            filename: 'logs/server.prod.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
        new transports.MongoDB({
            level: 'error',
            db: config.mongoDBURI,
            options: {
                useUnifiedTopology: true,
            },
            collection: 'server_logs',
            format: format.combine(format.timestamp(), format.json()),
        }),
        // Debuging transports
        new transports.File({
            filename: 'logs/server.debug.log',
            level: 'debug',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(
                    (info) =>
                        `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
        }),
    ],
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- STREAMS -------------------------------- */

const serverDebugLogStream = fs.createWriteStream(
    path.join(__dirname, '../../logs/server.debug.log'),
    { flags: 'a' }
);
const serverProdLogStream = fs.createWriteStream(
    path.join(__dirname, '../../logs/server.prod.log'),
    { flags: 'a' }
);

const streams = {
    debug: serverDebugLogStream,
    prod: serverProdLogStream,
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { logger, streams };

/* -------------------------------------------------------------------------- */
