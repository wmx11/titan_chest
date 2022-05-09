import { Bots } from '@prisma/client';
import { Client, Intents } from 'discord.js';
import { getAllEnabledBots } from '../controllers/bots';
import { getProjectStatsById } from '../controllers/stats';
import eventBus from '../utils/eventBus';
import events from '../utils/events';
import setNickname from './utils/setNickname';

const handleBotInit = (bot: Bots, enabled: boolean) => {
  const isActive = enabled;

  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.once('ready', async () => {
    console.log(`${bot.name} Is Online`);

    client.user?.setPresence({
      activities: [{ name: bot.presence, type: 'WATCHING' }],
      status: 'online',
    });

    eventBus.on(events.bots.update, (entry) => {
      console.log(entry);
    });

    const stats = await getProjectStatsById({ type: 'project_id', value: bot.project_id });

    if (!stats.length) {
      return;
    }

    const trackingData = stats[0][bot.tracking].toLocaleString();

    setNickname(client, bot.bot_id, trackingData);
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

  eventBus.on(events.bots.update, (entry) => {
    handleBotInit(entry, entry.enabled);
  });

  if (!trackerBots.length) {
    console.log('No bots found');
    return;
  }

  trackerBots.forEach((bot) => handleBotInit(bot, true));
};

export default startDiscordBots;
