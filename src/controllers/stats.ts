import { PrismaClient, Stats, Prisma } from '@prisma/client';
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
  last_day: string | string[] | null;
  limit: string;
  select: string;
  order: Prisma.SortOrder;
};

export const getProjectStatsById = async (payload: Payload) => {
  const lastPreviousDay = payload.last_day
    ? {
        created_at: {
          lte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }
    : {};

  const selections = {};

  if (payload.select) {
    selections.select = {};

    if (payload.select.indexOf(',') > -1) {
      payload.select.split(',').forEach((item) => {
        selections.select[item] = true;
      });
    } else {
      selections.select[payload.select] = true;
    }
  }

  const stats = await prisma.stats.findMany({
    take: parseInt(payload.limit, 10) || 1,
    orderBy: [{ created_at: payload.order || 'desc' }],
    where: {
      [payload.type]: payload.value,
      ...lastPreviousDay,
    },
    ...selections,
  });

  return stats;
};
