import { PrismaClient, Token } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTokens = async (): Promise<Token[]> => {
  const tokens: Token[] = await prisma.token.findMany();

  return tokens;
};

export const getTokenById = async (id: number): Promise<Token | null> => {
  const token: Token | null = await prisma.token.findFirst({
    where: {
      id,
    },
  });

  return token;
};

export const addToken = async (token: Token): Promise<Token | null> => {
  const entry: Token | null = await prisma.token.create({
    data: { ...token },
  });

  return entry;
};

export const updateToken = async (id: number, token: Token): Promise<Token | null> => {
  const entry: Token | null = await prisma.token.update({
    where: {
      id,
    },
    data: {
      ...token,
    },
  });

  return entry;
};

export const deleteToken = async (id: number): Promise<Token | null> => {
  const entry: Token | null = await prisma.token.delete({
    where: {
      id,
    },
  });

  return entry;
};
