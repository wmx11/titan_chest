import { PrismaClient, Bots } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBots = async () => {
  const bots = await prisma.bots.findMany();

  return bots;
};

export const getBotById = async (id: number) => {
  const bot = await prisma.bots.findFirst({
    where: {
      id,
    },
  });

  return bot;
};

export const addBot = async (bot: Bots) => {
  const entry = await prisma.bots.create({
    data: { ...bot },
  });

  return entry;
};

export const updateBot = async (id: number, bot: Bots) => {
  const entry = await prisma.bots.update({
    where: {
      id,
    },
    data: {
      ...bot,
    },
  });

  return entry;
};

export const deleteBot = async (id: number) => {
  const entry = await prisma.bots.delete({
    where: {
      id,
    },
  });

  return entry;
};
