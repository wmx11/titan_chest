/* eslint-disable @typescript-eslint/indent */
import { PrismaClient, Stats } from '@prisma/client';
import constructDynamicQuery from '../services/constructDynamicQuery';
import { DynamicQueryType } from '../types/ComputedFields';
import { Payload } from '../types/Stats';
import { channels, redisPublish } from '../utils/redisClient';

const prisma = new PrismaClient();

export const addProjectStats = async (stats: Stats): Promise<Stats | null> => {
  const entry: Stats | null = await prisma.stats.create({
    data: { ...stats },
  });

  await redisPublish(channels.stats, entry);

  return entry;
};

export const getProjectStatsById = async (payload: Payload): Promise<Stats[]> => {
  const statsQuery: DynamicQueryType | Record<string, never> = constructDynamicQuery(payload, 'stats');

  if (!statsQuery) {
    return [];
  }

  if (statsQuery) {
    const { query, generateComputedFields } = statsQuery;
    const stats: Stats[] | null = await prisma.stats.findMany({ ...(query as object) });
    const withComputedFields = generateComputedFields(payload, stats);
    console.log(withComputedFields);
    
    return withComputedFields;
  }

  return [];
};
