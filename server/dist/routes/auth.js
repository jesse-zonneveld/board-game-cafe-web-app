"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressPromiseRouter = _interopRequireDefault(require("express-promise-router"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _passport = require("../middleware/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file routes/auth.js
 * @author Jesse Zonneveld
 * @description Auth routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
const router = new _expressPromiseRouter.default();
/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */
// Create User

router.post('/register/create-user', _auth.default.createUser); // Login User

router.post('/login/login-user', _passport.credCheck, _auth.default.loginUser); // Logout User

router.get('/logout', _auth.default.logoutUser); // refreshToken

router.post('/refresh-token', _auth.default.refreshAccessAndRefreshTokens);
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = router;
/* -------------------------------------------------------------------------- */

exports.default = _default;