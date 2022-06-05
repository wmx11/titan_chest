import { Client } from 'discord.js';

export default (client: Client, botId: string, nickname: string): void => {
  client.guilds.cache.forEach((guild) => {
    const { id } = guild;
    client?.guilds?.cache?.get(id)?.members?.cache?.get(botId)?.setNickname(nickname);
  });
};
