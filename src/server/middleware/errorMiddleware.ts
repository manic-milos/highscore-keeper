import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/winston';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  logger.error(err.message, statusCode);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
  next();
};

export default errorHandler;
