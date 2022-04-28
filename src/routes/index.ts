import {Express} from 'express';
import UserRoutes from './user/user';

export default (app: Express): void => {
  app.get('/api', (req, res) => res.status(200).send('API running'));
  app.use('/api/user', UserRoutes);
};
