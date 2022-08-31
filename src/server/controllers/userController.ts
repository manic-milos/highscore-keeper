import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import brypt from 'bcryptjs';
import { logger } from '../config/winston';

import User from '../models/userModel';

// TODO move this elsewhere
export const generateToken = (id: any) => jwt.sign({ _id: id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

// @desc register user
// @route POST /api/users/
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('name, email and password are required');
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await brypt.genSalt();
  const hashedPassword = await brypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  logger.debug(newUser);

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('User not created');
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
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  const isMatch = await brypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Invalid credentials');
  }
  res.status(200).json({
    msg: 'User authenticated',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = expressAsyncHandler(async (req: any, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({ _id, name, email });
});

export default { registerUser, authenticateUser, getUserProfile };
