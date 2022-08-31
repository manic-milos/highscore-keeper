import mongoose from 'mongoose';
import { logger } from './winston';

export const connectDB = async () => {
  try {
    const conString = `${process.env.MONGO_URI}/highscore-${process.env.NODE_ENV}?retryWrites=true&w=majority`;
    logger.info(conString);
    const conn = await mongoose.connect(conString);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
