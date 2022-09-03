import mongoose, { Types } from 'mongoose';

export interface IHighscore {
  _id: Types.ObjectId;
  gameId: Types.ObjectId;
  userId: Types.ObjectId;
  score: number;
}

const highscoreSchema = new mongoose.Schema<IHighscore>(
  {
    score: {
      type: Number,
      required: [true, 'score is required'],
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: [true, 'game is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user is required'],
    },
  },
  { timestamps: true },
);

export * from './modelmethods/highscoreCRUD';

export default mongoose.model('Highscore', highscoreSchema);
