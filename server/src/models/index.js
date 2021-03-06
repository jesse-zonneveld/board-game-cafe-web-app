/**
 * @file models/index.js
 * @author Jesse Zonneveld
 * @description All models in one file
 */

/* --------------------------------- IMPORTS -------------------------------- */

import mongoose from 'mongoose';
import User from './user';
import Restaurant from './restaurant';
import BoardGame from './boardGame';
import Review from './review';
import RefreshToken from './refreshToken';

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { mongoose, User, Restaurant, BoardGame, Review, RefreshToken };

/* -------------------------------------------------------------------------- */
