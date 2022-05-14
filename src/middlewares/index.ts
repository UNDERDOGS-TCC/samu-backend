import {Express} from 'express';
import nocache from 'nocache';
import bodyParser from './bodyParser';
import morgan from './morgan';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(morgan);
  app.set('etag', false);
  app.use(nocache());
};
