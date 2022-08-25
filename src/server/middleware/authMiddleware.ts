import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

export interface RequestAuth extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: RequestAuth, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        [, token] = req.headers.authorization.split(' ');
      } catch (err) {
        res.status(401);
        throw new Error('Unauthorized');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('No token, authorization denied');
    }
    const id = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }
    req.user = user;
    next();
  },
);

export default { protect };
