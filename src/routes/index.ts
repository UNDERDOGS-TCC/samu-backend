import {Express} from 'express';
import LoginRoutes from './login/login';
import SignupRoutes from './signup/signup';

export default (app: Express): void => {
  app.use('/login', LoginRoutes);
  app.use('/signup', SignupRoutes);
};
