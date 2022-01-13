/**
 * @file controllers/boardGame.js
 * @author Jesse Zonneveld
 * @description Board game controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

// const errorHandler from '../errors/errorHandlerOld');
import Api404Error from '../errors/api404Error';
import { BoardGame, Review } from '../models/index';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ----------------------- RESTAURANT CONTROLLER CLASS ---------------------- */

class BoardGameController {
    getAllBoardGames = async (req, res, next) => {
        logger.debug('Start of getAllBoardGames controller');

        try {
            const boardGames = await BoardGame.find();

            if (!boardGames) {
                throw new Api404Error('No boardGames found.');
            }

            logger.info(`Found ${boardGames.length} board games`);

            await Promise.all(
                boardGames.map(async (game) => {
                    const averageRatingAgg = await Review.aggregate([
                        { $match: { boardGame_id: game._id.toString() } },
                        {
                            $group: {
                                _id: '$boardGame_id',
                                average: { $avg: '$rating' },
                            },
                        },
                    ]);

                    if (averageRatingAgg[0]) {
                        game.set('averageRating', averageRatingAgg[0].average, {
                            strict: false,
                        });

                        logger.info(
                            `Added averageRating of ${averageRatingAgg[0].average} to boardGame ${game._id}`
                        );
                    }
                })
            );

            logger.info('All board games aggregated with average ratings');

            res.status(200).json({
                success: true,
                dataCount: boardGames.length,
                data: boardGames,
            });
        } catch (err) {
            next(err);
        }
    };

    getSingleBoardGame = async (req, res, next) => {
        logger.debug('Start of getSingleBoardGame controller');

        try {
            const boardGame = await BoardGame.findById(req.params.id).populate(
                'reviews'
            );

            if (!boardGame) {
                throw new Api404Error(
                    `No boardGame found with id: ${req.params.id}.`
                );
            }

            logger.info(`Found boardGame ${boardGame._id}`);

            const averageRatingAgg = await Review.aggregate([
                { $match: { boardGame_id: boardGame._id.toString() } },
                {
                    $group: {
                        _id: '$boardGame_id',
                        average: { $avg: '$rating' },
                    },
                },
            ]);

            if (averageRatingAgg[0]) {
                boardGame.set('averageRating', averageRatingAgg[0].average, {
                    strict: false,
                });

                logger.info(
                    `Added averageRating of ${averageRatingAgg[0].average} to boardGame ${boardGame._id}`
                );
            }

            res.status(200).json({
                success: true,
                data: {
                    boardGame,
                },
            });
        } catch (err) {
            next(err);
        }
    };

    createBoardGame = async (req, res, next) => {
        logger.debug('Start of createBoardGame controller');

        try {
            const boardGame = await BoardGame.create(req.body);

            logger.info(`BoardGame created - ${boardGame._id}`);

            res.status(201).json({
                success: true,
                data: boardGame,
            });
        } catch (err) {
            next(err);
        }
    };

    updateBoardGame = async (req, res, next) => {
        logger.debug('Start of updateBoardGame controller');

        try {
            const { id } = req.params;

            const boardGame = new BoardGame(req.body);
            await boardGame.validate();

            logger.info(`BoardGame updated values are valid - ${req.body}`);

            const updatedBoardGame = await BoardGame.findByIdAndUpdate(id, {
                primaryName: boardGame.primaryName,
                alternativeNames: boardGame.alternativeNames,
                yearReleased: boardGame.yearReleased,
                designers: boardGame.designers,
                artists: boardGame.artists,
                publishers: boardGame.publishers,
                developers: boardGame.developers,
                graphicDesigners: boardGame.graphicDesigners,
                sculpters: boardGame.sculpters,
                writers: boardGame.writers,
                editors: boardGame.editors,
                insertDesigners: boardGame.insertDesigners,
                categories: boardGame.categories,
                mechanisms: boardGame.mechanisms,
            });

            if (!updatedBoardGame) {
                throw new Api404Error(`No boardGame found with id: ${id}.`);
            }

            logger.info(`BoardGame updated - ${updatedBoardGame._id}`);

            res.status(200).json({
                success: true,
                data: boardGame,
            });
        } catch (err) {
            next(err);
        }
    };

    deleteBoardGame = async (req, res, next) => {
        logger.debug('Start of deleteBoardGame controller');

        try {
            const { id } = req.params;
            const deletedBoardGame = await BoardGame.findByIdAndDelete(id);

            if (!deletedBoardGame) {
                throw new Api404Error(`No board game found with id: ${id}.`);
            }

            logger.info(`BoardGame deleted - ${deletedBoardGame._id}`);

            res.status(204).json();
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new BoardGameController();

/* -------------------------------------------------------------------------- */
