import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });

export default redisClient;

export const channels = {
  bots: 'bot-channel',
  stats: 'stats-channel',
};

export const redisPublish = async (channel: string, data: object) => {
  await redisClient.connect();
  const message = await redisClient.publish(channel, JSON.stringify(data));
  await redisClient.quit();
  return message;
};

export const redisSubscribe = async (channel: string, callback: (message: string) => void) => {
  const subClient = redisClient.duplicate();
  await subClient.connect();
  const subscription = await subClient.subscribe(channel, (message: string) => {
    callback(message);
  });
  return subscription;
};
