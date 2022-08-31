import express from 'express';
import { protect } from '../middleware/authMiddleware';

import {
  getAllGames,
  getGameInfo,
  createGame,
  updateGame,
} from '../controllers/gameController';

const router = express.Router();

router.get('/', getAllGames);
router.post('/', protect, createGame);
router.put('/:id', protect, updateGame);
router.get('/:id', getGameInfo);

export { router };
export default router;
