/**
 * @file models/user.js
 * @author Jesse Zonneveld
 * @description User model
 */

/* ----------------------------- IMPORTS &SETUP ----------------------------- */

import mongoose from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

/* -------------------------------------------------------------------------- */

/* --------------------------------- SCHEMA --------------------------------- */

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'No username entered.'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'No email entered.'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Invalid email format.'],
        },
        password: {
            type: String,
            required: [true, 'No password entered.'],
            minlength: [8, 'Password must have atleast 8 characters.'],
        },
        banned: {
            type: Boolean,
            required: [true, 'No banned restrictions given.'],
            default: false,
        },
    },
    { timestamps: true }
);

/* -------------------------------------------------------------------------- */

/* ---------------------------- SCHEMA FUNCTIONS ---------------------------- */

// mongoose hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

// mongoose hook to add banned restrictions before saving
userSchema.pre('save', async function (next) {
    this.banned = false;
    return next();
});

// // example mongoose hook for after save
// userSchema.post('save', (doc, next) => {
//     console.log('new user was created', doc);
//     next();
// });

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default mongoose.model('User', userSchema);

/* -------------------------------------------------------------------------- */
