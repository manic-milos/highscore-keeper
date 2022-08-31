import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { logger } from './config/winston';
import errorHandler from './middleware/errorMiddleware';
import connectDB from './config/db';
import { routes } from './index.routes';

const initServer = () => {
  config();

  connectDB();

  const port = process.env.PORT || 5051;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cors());
  app.use('/api', routes);

  const error = errorHandler;
  app.use(error);

  return {
    start: () => app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    }),
  };
};

export default initServer;
