import { Bots, Stats } from '@prisma/client';
import { Client, Intents } from 'discord.js';
import { getAllEnabledBots } from '../controllers/bots';
import { getProjectStatsById } from '../controllers/stats';
import { channels, redisSubscribe } from '../utils/redisClient';
import toCurrency from '../utils/toCurrency';
import setNickname from './utils/setNickname';

const handleBotInit = (bot: Bots, enabled: boolean): void => {
  const isActive: boolean = enabled;

  const setBotData = async (client: Client): Promise<void> => {
    const stats: Stats[] = await getProjectStatsById({ type: 'project_id', value: bot.project_id });

    if (!stats.length) {
      return;
    }

    const statsData: string | number | Date | null = stats[0][bot.tracking as keyof Stats];
    let trackingData: string | undefined = '';

    if (bot.tracking === 'holders' || bot.tracking === 'average_holdings') {
      trackingData = statsData?.toLocaleString() || '';
    } else {
      trackingData = toCurrency(statsData as number, (statsData as number).toFixed(3).length - 1 || undefined) || '';
    }

    setNickname(client, bot.bot_id as string, trackingData);
  };

  const client: Client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.once('ready', async (): Promise<void> => {
    console.log(`${bot.name} Is Online`);

    client.user?.setPresence({
      activities: [{ name: bot.presence, type: 'WATCHING' }],
      status: 'online',
    });

    setBotData(client);

    redisSubscribe(channels.stats, (message: string): void => {
      const parsedStats: Stats = JSON.parse(message);
      if (parsedStats.project_id === bot.project_id) {
        setBotData(client);
      }
    });
  });

  try {
    if (!isActive) {
      client.destroy();
      return;
    }

    client.login(bot.token as string);
  } catch (error) {
    console.log(error);
  }
};

const startDiscordBots = async (): Promise<void> => {
  const trackerBots: Bots[] = await getAllEnabledBots();

  await redisSubscribe(channels.bots, (message: string): void => {
    const parsedBot: Bots = JSON.parse(message);
    handleBotInit(parsedBot, parsedBot.enabled);
  });

  if (!trackerBots.length) {
    console.log('No bots found');
    return;
  }

  return trackerBots.forEach((bot: Bots): void => handleBotInit(bot, true));
};

((): void => {
  startDiscordBots();
})();
