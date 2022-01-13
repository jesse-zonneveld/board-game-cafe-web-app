"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streams = exports.logger = void 0;

var _winston = require("winston");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _env = _interopRequireDefault(require("../config/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file utils/logger.js
 * @author Jesse Zonneveld
 * @description Logger
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
require('winston-mongodb');
/* -------------------------------------------------------------------------- */

/* ----------------------------- LOGGER FUNCTION ---------------------------- */


const logger = (0, _winston.createLogger)({
  transports: [// Production transports
  new _winston.transports.File({
    filename: 'logs/server.prod.log',
    level: 'error',
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    format: _winston.format.combine(_winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }), _winston.format.align(), _winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
  }), new _winston.transports.MongoDB({
    level: 'error',
    db: _env.default.mongoDBURI,
    options: {
      useUnifiedTopology: true
    },
    collection: 'server_logs',
    format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json())
  }), // Debuging transports
  new _winston.transports.File({
    filename: 'logs/server.debug.log',
    level: 'debug',
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    format: _winston.format.combine(_winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }), _winston.format.align(), _winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
  }), new _winston.transports.Console({
    level: 'debug',
    format: _winston.format.combine(_winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }), _winston.format.align(), _winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
  })]
});
/* -------------------------------------------------------------------------- */

/* --------------------------------- STREAMS -------------------------------- */

exports.logger = logger;

const serverDebugLogStream = _fs.default.createWriteStream(_path.default.join(__dirname, '../../logs/server.debug.log'), {
  flags: 'a'
});

const serverProdLogStream = _fs.default.createWriteStream(_path.default.join(__dirname, '../../logs/server.prod.log'), {
  flags: 'a'
});

const streams = {
  debug: serverDebugLogStream,
  prod: serverProdLogStream
};
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

/* -------------------------------------------------------------------------- */

exports.streams = streams;