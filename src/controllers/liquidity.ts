import { PrismaClient } from '@prisma/client';
import { Liquidity } from '../types/Liquidity';

const prisma = new PrismaClient();

export const getAllLiquidityPools = async () => {
  const liquidity = await prisma.liquidity.findMany();

  return liquidity;
};

export const getLiquidityPoolById = async (id: number) => {
  const liquidity = await prisma.liquidity.findFirst({
    where: {
      id,
    },
  });

  return liquidity;
};

export const addLiquidityPool = async (liquidity: Liquidity) => {
  const entry = await prisma.liquidity.create({
    data: { ...liquidity },
  });

  return entry;
};

export const updateLiquidityPool = async (id: number, liquidity: Liquidity) => {
  const entry = await prisma.liquidity.update({
    where: {
      id,
    },
    data: {
      ...liquidity,
    },
  });

  return entry;
};

export const deleteLiquidityPool = async (id: number) => {
  const entry = await prisma.liquidity.delete({
    where: {
      id,
    },
  });

  return entry;
};
