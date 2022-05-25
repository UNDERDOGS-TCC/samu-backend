import 'dotenv/config';
import express from 'express';
import setupMiddlewares from './src/middlewares';
import setupRoutes from './src/routes';
import mongodb from './src/config/mongodb';

const app = express();
app.use('/', express.static('public'));
setupMiddlewares(app);
setupRoutes(app);

const port = process.env.PORT ?? 3333;

mongodb
  .connect()
  .then(() => {
    console.log('connected to mongodb');
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(console.error);
