import expressAsyncHandler from 'express-async-handler';
// import jwt from 'jsonwebtoken';
// import brypt from 'bcryptjs';

import HighScore from '../models/highscoreModel';

// @desc get all highscores
// @route GET /api/highscores/
// @param gameId - id of the game to get highscores for
// @access Public
export const getAllHighscores = expressAsyncHandler(async (req, res) => {
  const { gameId } = req.params;
  if (!gameId) {
    res.status(400);
    throw new Error('gameId is required');
  }
  const highscores = await HighScore.find({ game: gameId });
  if (!highscores) {
    res.status(400);
    throw new Error('Highscores not found');
  }
  res.status(200).json(highscores);
});

// @desc create a highscore
// @route POST /api/highscores/
// @param gameId - id of the game to create highscore for
// @param score - score of the highscore
// @access Private
export const createHighscore = expressAsyncHandler(async (req : any, res) => {
  const { gameId } = req.params;
  const { score } = req.body;
  if (!gameId || !score) {
    res.status(400);
    throw new Error('gameId and score are required');
  }
  const highscore = await HighScore.create({
    game: gameId,
    score,
    user: req.user._id,
  });
  if (!highscore) {
    res.status(400);
    throw new Error('Highscore not created');
  }
  res.status(201).json(highscore);
});

export default { getAllHighscores, createHighscore };
