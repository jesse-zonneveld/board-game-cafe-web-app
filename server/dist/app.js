"use strict";

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _errorHandler = require("./errors/errorHandler");

var _env = _interopRequireDefault(require("./config/env"));

var _index = _interopRequireDefault(require("./routes/index"));

var _passport = _interopRequireDefault(require("./config/passport"));

var _logger = require("./utils/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* --------------------------------- IMPORTS -------------------------------- */
// const express = require('express');

/* -------------------------------------------------------------------------- */

/* ---------------------------------- SETUP --------------------------------- */
const app = (0, _express.default)();
const port = process.env.PORT || 8080; // Connect to mongoDB with mongoose

_mongoose.default.connect(_env.default.mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true
}).then(() => {
  app.listen(port, () => {
    _logger.logger.info(`Server is listening on PORT ${port}`);
  });
}).catch(err => {
  _logger.logger.error('Connection Error: ', err);
});

_mongoose.default.connection.on('connected', () => {
  _logger.logger.info('Mongoose connected to DB');
});

_mongoose.default.connection.on('error', err => {
  _logger.logger.error(err.message);
});

_mongoose.default.connection.on('disconnected', () => {
  _logger.logger.info('Mongoose disconnected from DB');
});

process.on('SIGINT', async () => {
  await _mongoose.default.connection.close();
  process.exit(0);
});
/* -------------------------------------------------------------------------- */

/* ------------------------ MIDDLEWARE BEFORE ROUTES ------------------------ */

(0, _passport.default)(app);
app.use((0, _helmet.default)());
app.use((0, _cors.default)({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(_express.default.json());
app.use((0, _morgan.default)('combined', {
  stream: _logger.streams.debug
}));
app.use((0, _morgan.default)('combined', {
  stream: _logger.streams.prod
}));
app.use((0, _cookieParser.default)());
/* -------------------------------------------------------------------------- */

/* ---------------------------------- ROUTE --------------------------------- */

(0, _index.default)(app);
app.use((req, res, next) => {
  console.log('middleware after routes');
  next();
});
/* -------------------------------------------------------------------------- */

/* ------------------------- MIDDLEWARE AFTER ROUTES ------------------------ */

app.use(_errorHandler.logErrorMiddleware);
app.use(_errorHandler.returnError);
/* -------------------------------------------------------------------------- */