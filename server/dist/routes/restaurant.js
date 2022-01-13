"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressPromiseRouter = _interopRequireDefault(require("express-promise-router"));

var _restaurant = _interopRequireDefault(require("../controllers/restaurant"));

var _passport = require("../middleware/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file routes/restaurant.js
 * @author Jesse Zonneveld
 * @description Restaurant routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */
const router = new _expressPromiseRouter.default();
/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */
// Get All Restaurants

router.get('/', _restaurant.default.getAllRestaurants); // Get Single Restaurant

router.get('/:id', _passport.tokenCheck, _restaurant.default.getSingleRestaurant); // Create Restaurant

router.post('/', _passport.tokenCheck, _restaurant.default.createRestaurant); // Update Restaurant

router.put('/:id', _passport.tokenCheck, _restaurant.default.updateRestaurant); // Delete Restaurant

router.delete('/:id', _passport.tokenCheck, _restaurant.default.deleteRestaurant);
/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

var _default = router;
/* -------------------------------------------------------------------------- */

exports.default = _default;