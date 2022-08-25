import express from 'express';
import { protect } from '../middleware/authMiddleware';

import {
  getAllGames,
  getGameInfo,
  createGame,
} from '../controllers/gameController';

const router = express.Router();

router.get('/', getAllGames);
router.post('/', protect, createGame);
router.get('/:id', getGameInfo);

export { router };
export default router;
