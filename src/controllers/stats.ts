/* eslint-disable @typescript-eslint/indent */
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
  compute: string | null;
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

  type ComputedField = {
    name: string;
    compute: boolean;
    generate: (data: { marketcap: number | null; price: number | null }) => number | null;
  };

  const computedFields: ComputedField[] = [
    {
      name: 'total_supply',
      compute: !!payload.compute || false,
      generate: (data): number | null => {
        if (data.marketcap && data.price) {
          return data.marketcap / data.price;
        }

        return null;
      },
    },
  ];

  if (payload.select) {
    const select = {
      select: {},
    };

    if (payload.select.indexOf(',') > -1) {
      payload.select.split(',').forEach((item) => {
        const computedFieldIndex: number = computedFields.findIndex((field) => item === field.name);
        if (computedFieldIndex > -1) {
          computedFields[computedFieldIndex].compute = true;
        } else {
          Object.assign(select.select, { [item]: true });
        }
      });
    } else {
      Object.assign(select.select, { [payload.select]: true });
    }

    Object.assign(selections, select);
  }

  const stats = (await prisma.stats.findMany({
    take: parseInt(payload.limit, 10) || 1,
    orderBy: [{ created_at: payload.order || 'desc' }],
    where: {
      [payload.type]: payload.value,
      ...lastPreviousDay,
    },
    ...selections,
  })) as Stats[];

  const getComputedFields: ComputedField[] = computedFields.filter((field: ComputedField) => field.compute === true);

  if (getComputedFields.length) {
    return stats.map((stat) => {
      const computedStat: Stats = { ...stat };

      getComputedFields.forEach((field) => {
        const computedValue = field.generate(computedStat);
        Object.assign(computedStat, { [field.name]: computedValue });
      });

      return computedStat;
    });
  }

  return stats;
};
