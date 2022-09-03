import { before } from 'mocha';
import gameModel from '../server/models/gameModel';
import highscoreModel from '../server/models/highscoreModel';
import userModel from '../server/models/userModel';

process.env.NODE_ENV = 'test';
const d = () => {};

before(async () => {
  await userModel.deleteMany({});
  await gameModel.deleteMany({});
  await highscoreModel.deleteMany({});
});

export default d;
