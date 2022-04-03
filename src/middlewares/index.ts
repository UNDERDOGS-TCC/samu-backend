import {Express} from 'express';
import bodyParser from './bodyParser';
import morgan from './morgan';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(morgan);
};
