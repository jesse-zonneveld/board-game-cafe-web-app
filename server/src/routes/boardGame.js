/**
 * @file routes/boardGame.js
 * @author Jesse Zonneveld
 * @description Board game routes
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import Router from 'express-promise-router';
import boardGameController from '../controllers/boardGame';
import { tokenCheck } from '../middleware/passport';

const router = new Router();

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */

// Get All BoardGames
router.get('/', boardGameController.getAllBoardGames);

// Get Single BoardGame
router.get('/:id', tokenCheck, boardGameController.getSingleBoardGame);

// Create BoardGame
router.post('/', tokenCheck, boardGameController.createBoardGame);

// Update BoardGame
router.put('/:id', tokenCheck, boardGameController.updateBoardGame);

// Delete BoardGame
router.delete('/:id', tokenCheck, boardGameController.deleteBoardGame);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default router;

/* -------------------------------------------------------------------------- */
