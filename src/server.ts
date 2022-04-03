import express from 'express';
import setupRoutes from './routes';

const app = express();
setupRoutes(app);

const port = process.env.PORT ?? 3333;

app.listen(port, () => console.log(`listening on port ${port}`));
