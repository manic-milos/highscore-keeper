import { Schema, model } from 'mongoose';

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

export default model('Game', gameSchema);
