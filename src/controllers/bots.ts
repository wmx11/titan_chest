import { PrismaClient, Bots } from '@prisma/client';
import eventBus from '../utils/eventBus';
import events from '../utils/events';

const prisma = new PrismaClient();

export const getAllBots = async () => {
  const bots = await prisma.bots.findMany();

  return bots;
};

export const getAllEnabledBots = async () => {
  const bots = await prisma.bots.findMany({
    where: {
      enabled: true,
    },
  });

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
  const sanitizedBot = JSON.parse(JSON.stringify(bot));

  sanitizedBot.bot_id = sanitizedBot?.bot_id?.toString();

  const entry = await prisma.bots.create({
    data: { ...sanitizedBot },
  });

  return entry;
};

export const updateBot = async (id: number, bot: Bots) => {
  const sanitizedBot = JSON.parse(JSON.stringify(bot));

  sanitizedBot.bot_id = sanitizedBot?.bot_id?.toString();

  const entry = await prisma.bots.update({
    where: {
      id,
    },
    data: {
      ...sanitizedBot,
    },
  });

  eventBus.emit(events.bots.update, entry);

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
