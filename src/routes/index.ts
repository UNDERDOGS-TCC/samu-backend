import {Express} from 'express';
import LoginRoutes from './login/login';

export default (app: Express): void => {
  app.use('/login', LoginRoutes);
};
