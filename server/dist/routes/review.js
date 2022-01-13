"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressPromiseRouter = _interopRequireDefault(require("express-promise-router"));

var _review = _interopRequireDefault(require("../controllers/review"));

var _passport = require("../middleware/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file routes/review.js
 * @author Jesse Zonneveld
 * @description Review routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
const router = new _expressPromiseRouter.default();
/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */
// Create Review

router.post('/:id/create-review', _passport.tokenCheck, _review.default.createReview);
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = router;
/* -------------------------------------------------------------------------- */

exports.default = _default;