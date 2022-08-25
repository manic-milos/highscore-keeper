import express from 'express';
import {
  getAllHighscores,
  createHighscore,
} from '../controllers/highscoreController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:gameId', getAllHighscores);
router.post('/:gameId', protect, createHighscore);

export { router };
export default router;
