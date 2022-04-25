import express, { Application, Request, Response } from 'express';

import routes from './src/config/routes';
import statsRoute from './src/routes/stats';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: any = process.env.PORT || 3000;

app.use(routes.stats, statsRoute);

app.listen(port, () => {
  console.log(`Titan Chest API server started on port ${port}`);
});
