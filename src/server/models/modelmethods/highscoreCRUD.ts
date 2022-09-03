import Highscore, { IHighscore } from '../highscoreModel';

export const getAllFromGame = async (gameId: string) => {
  const highscores = await Highscore.find({ gameId });
  return highscores;
};

export const createHighscore = async (
  gameId: string,
  score: number,
  userId: string,
): Promise<IHighscore> => {
  const highscore = await Highscore.create({ gameId, score, userId });
  return highscore;
};

export default getAllFromGame;
