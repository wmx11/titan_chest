import { Bots } from '@prisma/client';
import { Client, Intents } from 'discord.js';
import { getAllEnabledBots } from '../controllers/bots';
import { getProjectStatsById } from '../controllers/stats';
import { channels, redisSubscribe } from '../utils/redisClient';
import toCurrency from '../utils/toCurrency';
import setNickname from './utils/setNickname';

const handleBotInit = (bot: Bots, enabled: boolean) => {
  const isActive = enabled;

  const setBotData = async () => {
    const stats = await getProjectStatsById({ type: 'project_id', value: bot.project_id });

    if (!stats.length) {
      return;
    }

    const statsData = stats[0][bot.tracking];
    let trackingData = '';

    if (bot.tracking !== 'holders' || bot.tracking !== 'average_holdings') {
      trackingData = toCurrency(statsData, statsData.toFixed(3).length - 1);
    } else {
      trackingData = statsData.toLocaleString();
    }

    setNickname(client, bot.bot_id, trackingData);
  };

  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.once('ready', async () => {
    console.log(`${bot.name} Is Online`);

    client.user?.setPresence({
      activities: [{ name: bot.presence, type: 'WATCHING' }],
      status: 'online',
    });

    setBotData();

    redisSubscribe(channels.stats, (message) => {
      const parsedStats = JSON.parse(message);
      if (parsedStats.project_id === bot.project_id) {
        console.log(parsedStats);
        setBotData();
      }
    });
  });

  try {
    if (!isActive) {
      client.destroy();
      return;
    }

    client.login(bot.token);
  } catch (error) {
    console.log(error);
  }
};

const startDiscordBots = async () => {
  const trackerBots = await getAllEnabledBots();

  await redisSubscribe(channels.bots, (message) => {
    const parsedBot = JSON.parse(message);
    handleBotInit(parsedBot, parsedBot.enabled);
  });

  if (!trackerBots.length) {
    console.log('No bots found');
    return;
  }

  return trackerBots.forEach((bot) => handleBotInit(bot, true));
};

(() => {
  startDiscordBots();
})();
