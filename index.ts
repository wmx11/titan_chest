import express, { Application } from 'express';
import cors from 'cors';
import routes from './src/config/routes';

import statsRoute from './src/routes/stats';
import projectRoute from './src/routes/project';
import abiRoute from './src/routes/abi';
import liquidityRoute from './src/routes/liquidity';
import networkRoute from './src/routes/network';
import tokenRoute from './src/routes/token';
import userRoute from './src/routes/user';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port: number | string = process.env.PORT || 3000;

const { stats, project, abi, liquidity, network, token, user } = routes;

app.use(stats, statsRoute);
app.use(project, projectRoute);
app.use(abi, abiRoute);
app.use(liquidity, liquidityRoute);
app.use(network, networkRoute);
app.use(token, tokenRoute);
app.use(user, userRoute);

app.listen(port, () => {
  console.log(`Titan Chest API server started on port ${port}`);
});
