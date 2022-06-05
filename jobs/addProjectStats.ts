import addProjectStatsService from '../src/services/addProjectStats';

(async (): Promise<void> => {
  await addProjectStatsService();
  console.log('Stats added');
})();
