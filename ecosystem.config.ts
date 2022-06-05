module.exports = [
  {
    script: './build/index.js',
    name: 'titan-chest-server',
  },
  {
    script: './build/cron.js',
    name: 'add-stats-job',
  },
  {
    script: './build/src/discord/index.js',
    name: 'discord',
  },
];
