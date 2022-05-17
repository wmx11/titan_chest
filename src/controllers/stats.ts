import { PrismaClient, Stats } from '@prisma/client';
import { channels, redisPublish } from '../utils/redisClient';

const prisma = new PrismaClient();

export const addProjectStats = async (stats: Stats) => {
  const entry = await prisma.stats.create({
    data: { ...stats },
  });

  await redisPublish(channels.stats, entry);

  return entry;
};

type Payload = {
  type: string;
  value: string | number | null;
};

export const getProjectStatsById = async (payload: Payload) => {
  const stats = await prisma.stats.findMany({
    take: 1,
    orderBy: [{ created_at: 'desc' }],
    where: {
      [payload.type]: payload.value,
    },
  });

  return stats;
};
