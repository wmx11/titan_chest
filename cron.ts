import cron from 'node-cron';
import addProjectStatsService from './src/services/addProjectStats';

cron.schedule('*/1 * * * *', async () => {
  await addProjectStatsService();
});
