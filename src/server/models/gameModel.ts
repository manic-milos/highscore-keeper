import { Schema, model, Types } from 'mongoose';

export interface IGame {
  _id: string;
  name: string;
  description: string;
  ownerId: Types.ObjectId;
  maxScore: number;
}

const gameSchema = new Schema<IGame>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'owner is required'],
    },
    maxScore: {
      type: Number,
      default: Infinity,
    },
  },
  { timestamps: true },
);

const Game = model<IGame>('Game', gameSchema);

export * from './modelmethods/gameCRUD';

export default Game;
