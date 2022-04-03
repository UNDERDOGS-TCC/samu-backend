import 'dotenv/config';
import express from 'express';
import setupRoutes from './routes';
import mongodb from './config/mongodb';

const app = express();
setupRoutes(app);

const port = process.env.PORT ?? 3333;

mongodb
  .connect()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(console.error);
