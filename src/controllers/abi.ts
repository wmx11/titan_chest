import { ABI, PrismaClient } from '@prisma/client';
import { Abi } from '../types/Abi';

const prisma = new PrismaClient();

export const getAllAbi = async (): Promise<ABI[]> => {
  const abis: ABI[] = await prisma.aBI.findMany();
  return abis;
};

export const getAbiById = async (id: number): Promise<ABI | null> => {
  const abi: ABI | null = await prisma.aBI.findFirst({
    where: {
      id,
    },
  });

  return abi;
};

export const addAbi = async (abi: Abi): Promise<ABI | null> => {
  const entry: ABI = await prisma.aBI.create({
    data: { ...abi },
  });

  return entry;
};

export const updateAbi = async (id: number, abi: Abi): Promise<ABI | null> => {
  const entry: ABI = await prisma.aBI.update({
    where: {
      id,
    },
    data: {
      ...abi,
    },
  });

  return entry;
};

export const deleteAbi = async (id: number): Promise<ABI | null> => {
  const entry: ABI = await prisma.aBI.delete({
    where: {
      id,
    },
  });

  return entry;
};
