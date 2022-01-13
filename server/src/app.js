/* --------------------------------- IMPORTS -------------------------------- */

// const express = require('express');
import express from 'express';

import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { logErrorMiddleware, returnError } from './errors/errorHandler';
import env from './config/env';
import mountRoutes from './routes/index';
import configurePassport from './config/passport';
import { logger, streams } from './utils/logger';

/* -------------------------------------------------------------------------- */

/* ---------------------------------- SETUP --------------------------------- */

const app = express();

const port = process.env.PORT || 8080;

// Connect to mongoDB with mongoose
mongoose
    .connect(env.mongoDBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
    })
    .then(() => {
        app.listen(port, () => {
            logger.info(`Server is listening on PORT ${port}`);
        });
    })
    .catch((err) => {
        logger.error('Connection Error: ', err);
    });

mongoose.connection.on('connected', () => {
    logger.info('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    logger.error(err.message);
});

mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose disconnected from DB');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

/* -------------------------------------------------------------------------- */

/* ------------------------ MIDDLEWARE BEFORE ROUTES ------------------------ */

configurePassport(app);
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(morgan('combined', { stream: streams.debug }));
app.use(morgan('combined', { stream: streams.prod }));
app.use(cookieParser());

/* -------------------------------------------------------------------------- */

/* ---------------------------------- ROUTE --------------------------------- */

mountRoutes(app);

app.use((req, res, next) => {
    console.log('middleware after routes');
    next();
});

/* -------------------------------------------------------------------------- */

/* ------------------------- MIDDLEWARE AFTER ROUTES ------------------------ */

app.use(logErrorMiddleware);
app.use(returnError);

/* -------------------------------------------------------------------------- */
