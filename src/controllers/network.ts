import { Network, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllNetworks = async (): Promise<Network[]> => {
  const network: Network[] = await prisma.network.findMany();

  return network;
};

export const getNetworkById = async (id: number): Promise<Network | null> => {
  const network: Network | null = await prisma.network.findFirst({
    where: {
      id,
    },
  });

  return network;
};

export const addNetwork = async (network: Network): Promise<Network | null> => {
  const entry: Network | null = await prisma.network.create({
    data: { ...network },
  });

  return entry;
};

export const updateNetwork = async (id: number, network: Network): Promise<Network | null> => {
  const entry: Network | null = await prisma.network.update({
    where: {
      id,
    },
    data: {
      ...network,
    },
  });

  return entry;
};

export const deleteNetwork = async (id: number): Promise<Network | null> => {
  const entry: Network | null = await prisma.network.delete({
    where: {
      id,
    },
  });

  return entry;
};
