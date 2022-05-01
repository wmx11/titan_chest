import { PrismaClient } from '@prisma/client';
import { Stats } from '../types/Stats';

const prisma = new PrismaClient();

export const addProjectStats = async (stats: Stats) => {
  const entry = await prisma.stats.create({
    data: { ...stats },
  });

  return entry;
};

export const getProjectStatsById = async (project_id: number) => {
  const stats = await prisma.stats.findMany({
    take: 1,
    orderBy: [{ created_at: 'desc' }],
    where: {
      project_id,
    },
  });

  return stats;
};
