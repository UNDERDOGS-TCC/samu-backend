import {Express} from 'express';
import UserRoutes from './user/user';
import MapRoutes from './map/map';

export default (app: Express): void => {
  app.get('/api', (req, res) => res.status(200).send('API running'));
  app.use('/api/user', UserRoutes);
  app.use('/api/map', MapRoutes);
};
