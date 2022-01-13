"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOperationalError = exports.returnError = exports.logErrorMiddleware = exports.logError = void 0;

var _baseError = _interopRequireDefault(require("./baseError"));

var _logger = require("../utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logError = (err, req) => {
  if (req) {
    if (err.name === 'AuthorizationError') {
      _logger.logger.error(`${err.status || 500} - ${err.name} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    } else {
      _logger.logger.error(`${err.status || 500} - ${err.name} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${err.stack}`);
    }
  } else {
    _logger.logger.error(`${err.status || 500} - ${err.name} - ${err.message} - ${err.stack}`);
  }
};

exports.logError = logError;

const logErrorMiddleware = (err, req, res, next) => {
  logError(err, req);
  next(err);
};

exports.logErrorMiddleware = logErrorMiddleware;

const getValidationErrors = errorsArray => {
  const errors = {};
  errorsArray.forEach(({
    properties
  }) => {
    errors[properties.path] = properties.message;
  });
  return errors;
};

const returnError = (err, req, res, next) => {
  switch (err.name) {
    case 'ValidationError':
      res.status(err.statusCode || 500).json({
        errors: getValidationErrors(Object.values(err.errors))
      });
      break;

    default:
      res.status(err.statusCode || 500).json({
        errors: {
          [err.name]: err.message
        }
      });
      break;
  }
};

exports.returnError = returnError;

const isOperationalError = err => {
  if (err instanceof _baseError.default) {
    return err.isOperational;
  }

  return false;
};

exports.isOperationalError = isOperationalError;
process.on('unhandledRejection', err => {
  throw err;
});
process.on('uncaughtException', err => {
  logError(err);

  if (!isOperationalError(err)) {
    process.exit(1);
  }
});