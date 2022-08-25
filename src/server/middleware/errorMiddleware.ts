import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  // TODO add logging

  // eslint-disable-next-line no-console
  console.log(statusCode);
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
  next();
};

export default errorHandler;
