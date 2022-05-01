import { PrismaClient } from '@prisma/client';
import { Abi } from '../types/Abi';

const prisma = new PrismaClient();

export const getAllAbi = async () => {
  const abis = await prisma.aBI.findMany();

  return abis;
};

export const getAbiById = async (id: number) => {
  const abi = await prisma.aBI.findFirst({
    where: {
      id,
    },
  });

  return abi;
};

export const addAbi = async (abi: Abi) => {
  const entry = await prisma.aBI.create({
    data: { ...abi },
  });

  return entry;
};

export const updateAbi = async (id: number, abi: Abi) => {
  const entry = await prisma.aBI.update({
    where: {
      id,
    },
    data: {
      ...abi,
    },
  });

  return entry;
};

export const deleteAbi = async (id: number) => {
  const entry = await prisma.aBI.delete({
    where: {
      id,
    },
  });

  return entry;
};
