/**
 * @file models/boardGame.js
 * @author Jesse Zonneveld
 * @description Board game model
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const boardGameSchema = new Schema(
    {
        primaryName: {
            type: String,
            required: [true, 'No primary name entered.'],
        },
        alternativeNames: {
            type: String,
        },
        yearReleased: {
            type: String,
            required: [true, 'No year released entered.'],
        },
        designers: {
            type: String,
            required: [true, 'No designer entered.'],
        },
        artists: {
            type: String,
            required: [true, 'No artists entered.'],
        },
        publishers: {
            type: String,
            required: [true, 'No publishers entered.'],
        },
        developers: {
            type: String,
            required: [true, 'No developers entered.'],
        },
        graphicDesigners: {
            type: String,
            required: [true, 'No graphic designers entered.'],
        },
        sculpters: {
            type: String,
            required: [true, 'No sculpters entered.'],
        },
        writers: {
            type: String,
            required: [true, 'No writers entered.'],
        },
        editors: {
            type: String,
            required: [true, 'No editors entered.'],
        },
        insertDesigners: {
            type: String,
            required: [true, 'No insert designers entered.'],
        },
        categories: {
            type: String,
            required: [true, 'No categories entered.'],
        },
        mechanisms: {
            type: String,
            required: [true, 'No mechanisms entered.'],
        },
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review',
            },
        ],
    },
    { timestamps: true }
);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default mongoose.model('BoardGame', boardGameSchema);

/* -------------------------------------------------------------------------- */
