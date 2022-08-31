import { Schema, model, ObjectId } from 'mongoose';

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    owner: {
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

const Game = model('Game', gameSchema);

export const gameCreate = async (
  name: string,
  description: string,
  owner: ObjectId,
  maxScore: number,
) => Game.create({
  name,
  description,
  owner,
  maxScore,
});

export default Game;
