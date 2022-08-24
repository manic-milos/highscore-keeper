{
  const expressAsyncHandler = require("express-async-handler");
  const jwt = require("jsonwebtoken");
  const brypt = require("bcryptjs");

  const Game = require("../models/gameModel");

  // @desc get info for a game
  // @route GET /api/games/:id
  // @access Public
  const getGameInfo = expressAsyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);
    if (!game) {
      res.status(400);
      throw new Error("Game not found");
    }
    res.status(200).json(game);
  });

  // @desc get all games
  // @route GET /api/games/
  // @access Public
  const getAllGames = expressAsyncHandler(async (req, res) => {
    const games = await Game.find();
    if (!games) {
      res.status(400);
      throw new Error("Games not found");
    }
    res.status(200).json(games);
  });

  // @desc create a game
  // @route POST /api/games/
  // @access Private
  const createGame = expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const { name, description, maxScore } = req.body;
    if (!name || !description) {
      res.status(400);
      throw new Error("name and description are required");
    }
    const game = await Game.create({
      name,
      description,
      owner: req.user._id,
      maxScore: maxScore,
    });
    if (!game) {
      res.status(400);
      throw new Error("Game not created");
    }
    res.status(201).json(game);
  });

  module.exports = {
    getGameInfo,
    getAllGames,
    createGame,
  };
}
