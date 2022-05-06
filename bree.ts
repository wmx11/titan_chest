import Bree from 'bree';
import TsWorker from '@breejs/ts-worker';
import Cabin from 'cabin';
import { Signale } from 'signale';
import path from 'path';

const cabin = new Cabin({
  axe: {
    logger: new Signale(),
  },
});

Bree.extend(TsWorker);

const bree = new Bree({
  logger: cabin,
  root: path.join(__dirname, 'jobs'),
  defaultExtension: 'ts',
  jobs: [
    {
      name: 'addProjectStats',
      interval: '1m',
    },
  ],
});

bree.start();
