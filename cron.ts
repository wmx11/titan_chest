import cron from 'node-cron';
import addProjectStatsService from './src/services/addProjectStats';

cron.schedule('*/5 * * * *', async (): Promise<void> => {
  await addProjectStatsService();
});
