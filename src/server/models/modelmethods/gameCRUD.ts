import Game, { IGame } from '../gameModel';

export interface IGameDTO extends Omit<IGame, '_id'> {}

export const gameCreate = async (game: Omit<IGame, '_id'>): Promise<IGame> => {
  const newGame:IGame = await Game.create({ ...game });

  return newGame;
};

export const gameUpdate = async (
  id: string,
  name: string,
  description: string,
  maxScore: number,
) => Game.findByIdAndUpdate(id, {
  name,
  description,
  maxScore,
});

export default gameCreate;
