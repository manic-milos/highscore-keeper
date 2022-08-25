import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import errorHandler from './middleware/errorMiddleware';
import connectDB from './config/db';
import { routes } from './index.routes';

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

app.listen(port, () => {
  // TODO add logging
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
