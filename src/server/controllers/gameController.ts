import expressAsyncHandler from 'express-async-handler';

import Game, { gameCreate, gameUpdate } from '../models/gameModel';

// @desc get info for a game
// @route GET /api/games/:id
// @access Public
export const getGameInfo = expressAsyncHandler(async (req: any, res) => {
  // TODO validate id
  const game = await Game.findById(req.params.id);
  if (!game) {
    res.status(400);
    throw new Error('Game not found');
  }
  res.status(200).json(game);
});

// @desc get all games
// @route GET /api/games/
// @access Public
export const getAllGames = expressAsyncHandler(async (_, res) => {
  const games = await Game.find();
  res.status(200).json(games);
});

// @desc create a game
// @route POST /api/games/
// @access Private
export const createGame = expressAsyncHandler(async (req: any, res) => {
  const { name, description, maxScore } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error('name and description are required');
  }
  const game = await gameCreate({
    name,
    description,
    ownerId: req.user._id,
    maxScore,
  });
  if (!game) {
    res.status(400);
    throw new Error('Game not created');
  }
  res.status(201).json(game);
});

// @desc update a game
// @route PUT /api/games/:id
// @access Private
export const updateGame = expressAsyncHandler(async (req: any, res) => {
  const { id } = req.params;
  const { name, description, maxScore } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error('name and description are required');
  }
  const game = await gameUpdate(id, name, description, maxScore);
  if (!game) {
    res.status(404);
    throw new Error('Game not found!');
  }
  res.status(200).json(game);
});

export default {
  getGameInfo,
  getAllGames,
  createGame,
  updateGame,
};
