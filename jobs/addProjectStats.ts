import { parentPort } from 'node:worker_threads';
import process from 'node:process';
import addProjectStatsService from '../src/services/addProjectStats';

(async () => {
  await addProjectStatsService();

  console.log('Stats added');

  if (parentPort) {
    parentPort.postMessage('done');
  } else {
    process.exit(0);
  }
})();
