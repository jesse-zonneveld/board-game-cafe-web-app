/**
 * @file error/baseError.js
 * @author Jesse Zonneveld
 * @description Base error class for custom errors
 */

/* ------------------------------- ERROR CLASS ------------------------------ */

class BaseError extends Error {
    constructor(message, name, statusCode, isOperational) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default BaseError;

/* -------------------------------------------------------------------------- */
