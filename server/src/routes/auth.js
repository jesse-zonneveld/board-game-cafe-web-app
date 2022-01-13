/**
 * @file routes/auth.js
 * @author Jesse Zonneveld
 * @description Auth routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import Router from 'express-promise-router';
import authController from '../controllers/auth';
import { credCheck } from '../middleware/passport';

const router = new Router();

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */

// Create User
router.post('/register/create-user', authController.createUser);

// Login User
router.post('/login/login-user', credCheck, authController.loginUser);

// Logout User
router.get('/logout', authController.logoutUser);

// refreshToken
router.post('/refresh-token', authController.refreshAccessAndRefreshTokens);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default router;

/* -------------------------------------------------------------------------- */
