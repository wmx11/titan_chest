import { PrismaClient } from '@prisma/client';
import { Network } from '../types/Network';

const prisma = new PrismaClient();

export const getAllNetworks = async () => {
  const network = await prisma.network.findMany();

  return network;
};

export const getNetworkById = async (id: number) => {
  const network = await prisma.network.findFirst({
    where: {
      id,
    },
  });

  return network;
};

export const addNetwork = async (network: Network) => {
  const entry = await prisma.network.create({
    data: { ...network },
  });

  return entry;
};

export const updateNetwork = async (id: number, network: Network) => {
  const entry = await prisma.network.update({
    where: {
      id,
    },
    data: {
      ...network,
    },
  });

  return entry;
};

export const deleteNetwork = async (id: number) => {
  const entry = await prisma.network.delete({
    where: {
      id,
    },
  });

  return entry;
};
