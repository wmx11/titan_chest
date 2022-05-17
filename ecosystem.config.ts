module.exports = [
  {
    script: 'index.js',
    name: 'titan-chest-server',
  },
  {
    script: 'cron.js',
    name: 'add-stats-job',
  },
  {
    script: 'src/discord/index.js',
    name: 'discord',
  },
];
