import { Liquidity, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllLiquidityPools = async (): Promise<Liquidity[]> => {
  const liquidity: Liquidity[] = await prisma.liquidity.findMany();

  return liquidity;
};

export const getLiquidityPoolById = async (id: number): Promise<Liquidity | null> => {
  const liquidity: Liquidity | null = await prisma.liquidity.findFirst({
    where: {
      id,
    },
  });

  return liquidity;
};

export const getLiquidityPoolByProjectOrTokenId = async (payload: {
  type: string;
  id: number;
}): Promise<Liquidity | null> => {
  const liquidity: Liquidity | null = await prisma.liquidity.findFirst({
    where: {
      [payload.type]: payload.id,
    },
  });

  return liquidity;
};

export const addLiquidityPool = async (liquidity: Liquidity): Promise<Liquidity | null> => {
  const entry: Liquidity | null = await prisma.liquidity.create({
    data: { ...liquidity },
  });

  return entry;
};

export const updateLiquidityPool = async (id: number, liquidity: Liquidity): Promise<Liquidity | null> => {
  const entry: Liquidity | null = await prisma.liquidity.update({
    where: {
      id,
    },
    data: {
      ...liquidity,
    },
  });

  return entry;
};

export const deleteLiquidityPool = async (id: number): Promise<Liquidity | null> => {
  const entry: Liquidity | null = await prisma.liquidity.delete({
    where: {
      id,
    },
  });

  return entry;
};
