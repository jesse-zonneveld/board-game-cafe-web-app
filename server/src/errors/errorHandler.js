import BaseError from './baseError';
import { logger } from '../utils/logger';

const logError = (err, req) => {
    if (req) {
        if (err.name === 'AuthorizationError') {
            logger.error(
                `${err.status || 500} - ${err.name} - ${err.message} - ${
                    req.originalUrl
                } - ${req.method} - ${req.ip}`
            );
        } else {
            logger.error(
                `${err.status || 500} - ${err.name} - ${err.message} - ${
                    req.originalUrl
                } - ${req.method} - ${req.ip} - ${err.stack}`
            );
        }
    } else {
        logger.error(
            `${err.status || 500} - ${err.name} - ${err.message} - ${err.stack}`
        );
    }
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err, req);
    next(err);
};

const getValidationErrors = (errorsArray) => {
    const errors = {};

    errorsArray.forEach(({ properties }) => {
        errors[properties.path] = properties.message;
    });

    return errors;
};

const returnError = (err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
            res.status(err.statusCode || 500).json({
                errors: getValidationErrors(Object.values(err.errors)),
            });
            break;

        default:
            res.status(err.statusCode || 500).json({
                errors: {
                    [err.name]: err.message,
                },
            });
            break;
    }
};

const isOperationalError = (err) => {
    if (err instanceof BaseError) {
        return err.isOperational;
    }
    return false;
};

process.on('unhandledRejection', (err) => {
    throw err;
});

process.on('uncaughtException', (err) => {
    logError(err);

    if (!isOperationalError(err)) {
        process.exit(1);
    }
});

export { logError, logErrorMiddleware, returnError, isOperationalError };
