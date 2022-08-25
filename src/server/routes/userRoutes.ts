import express from 'express';
import { registerUser, authenticateUser, getUserProfile } from '../controllers/userController';

import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authenticateUser);
router.get('/profile', protect, getUserProfile);

export { router };
export default router;
