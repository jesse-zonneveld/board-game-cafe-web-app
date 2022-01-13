/**
 * @file models/restaurant.js
 * @author Jesse Zonneveld
 * @description Restaurant model
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import mongoose from 'mongoose';

const { Schema } = mongoose;

/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'No restaurant name entered.'],
        },
        location: {
            type: String,
            required: [true, 'No restaurant location entered.'],
        },
        price: {
            type: String,
            required: [true, 'No restaurant price entered.'],
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

export default mongoose.model('Restaurant', restaurantSchema);

/* -------------------------------------------------------------------------- */
