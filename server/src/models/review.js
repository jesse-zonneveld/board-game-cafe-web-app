/**
 * @file models/review.js
 * @author Jesse Zonneveld
 * @description Review model
 */

/* ----------------------------- IMPORTS & SETUO ---------------------------- */

import mongoose from 'mongoose';
import Restaurant from './restaurant';
import User from './user';

const { Schema } = mongoose;

/* -------------------------------------------------------------------------- */

/* -------------------------- VALIDATION FUNCTIONS -------------------------- */

const validatedUser = (username, cb) => {
    console.log('inside validateUser in Review Modal');
    User.findOne({ username }, (err, user) => {
        if (err) {
            console.log(err);
        }

        cb(typeof user !== 'undefined' && user !== null);
    });
};

const validatedRestaurantID = (_id, cb) => {
    console.log('inside validateRestaurant in Review Modal');
    Restaurant.findOne({ _id }, (err, restaurant) => {
        if (err) {
            console.log(err);
        }

        cb(typeof restaurant !== 'undefined' && restaurant !== null);
    });
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const reviewSchema = new Schema(
    {
        restaurant_id: {
            type: String,
            required: [true, 'No review restaurant_id attached.'],
            validate: {
                isAsync: true,
                validator: validatedRestaurantID,
                message: "Review restaurant_id doesn't exist.",
            },
        },
        username: {
            type: String,
            required: [true, 'No review username attached.'],
            validate: {
                isAsync: true,
                validator: validatedUser,
                message: "Review username doesn't exist.",
            },
        },
        rating: {
            type: Number,
            required: [true, 'No review rating entered.'],
        },
        body: {
            type: String,
            required: [true, 'No review body entered.'],
        },
    },
    { timestamps: true }
);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default mongoose.model('Review', reviewSchema);

/* -------------------------------------------------------------------------- */
