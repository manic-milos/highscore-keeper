import expressAsyncHandler from 'express-async-handler';
import { logger } from '../config/winston';

import {
  AlreadyExistsError,
  createUser,
  authenticateUser as loginUser,
  UserNotFoundError,
  InvalidCredentialsError,
} from '../models/userModel';

// @desc register user
// @route POST /api/users/
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('name, email and password are required');
  }
  try {
    const newUser = await createUser(name, email, password);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(400);
      throw new Error('User not created');
    }
  } catch (err) {
    logger.error(err.message);
    if (err instanceof AlreadyExistsError) {
      res.status(400);
      throw err;
    }
    res.status(500);
    throw new Error(`Internal server error, reason: ${err.message}`);
  }
});

// @desc Authenticate user
// @route POST /api/users/auth
// @access Public
export const authenticateUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('email and password are required');
  }

  try {
    const user = loginUser(email, password);
    res.status(200).json({
      msg: 'User authenticated',
      user,
    });
  } catch (err) {
    logger.error(err.message);
    if (err instanceof UserNotFoundError) {
      res.status(400);
      throw new Error('User not found');
    } else if (err instanceof InvalidCredentialsError) {
      res.status(400);
      throw new Error('Invalid credentials');
    }
    res.status(500);
    throw new Error(`Internal server error, reason: ${err.message}`);
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = expressAsyncHandler(async (req: any, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({ _id, name, email });
});

export default { registerUser, authenticateUser, getUserProfile };
