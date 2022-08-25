import mongoose from 'mongoose';
import { logger } from './winston';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      //     {
      // useNewUrlParser:true,
      // useCreateIndex:true,
      // useFindAndModify:false,
      // useUnifiedTopology:true
      // }
    );
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
