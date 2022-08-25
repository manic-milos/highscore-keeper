import { Router } from 'express';
import { router as userRoutes } from './routes/userRoutes';
import { router as gameRoutes } from './routes/gameRoutes';
import { router as highscoreRoutes } from './routes/highscoreRoutes';

export const routes = Router();

routes.use('/user', userRoutes);
routes.use('/game', gameRoutes);
routes.use('/highscore', highscoreRoutes);

routes.use('/version', (_, res) => res.json({ version: '1.0.0' }));

export default routes;
