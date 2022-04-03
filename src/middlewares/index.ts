import {Express} from 'express';
import bodyParser from './bodyParser';

export default (app: Express): void => {
  app.use(bodyParser);
};
