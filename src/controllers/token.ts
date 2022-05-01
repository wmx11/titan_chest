import { PrismaClient } from '@prisma/client';
import { Token } from '../types/Token';

const prisma = new PrismaClient();

export const getAllTokens = async () => {
  const tokens = await prisma.token.findMany();

  return tokens;
};

export const getTokenById = async (id: number) => {
  const token = await prisma.token.findFirst({
    where: {
      id,
    },
  });

  return token;
};

export const addToken = async (token: Token) => {
  const entry = await prisma.token.create({
    data: { ...token },
  });

  return entry;
};

export const updateToken = async (id: number, token: Token) => {
  const entry = await prisma.token.update({
    where: {
      id,
    },
    data: {
      ...token,
    },
  });

  return entry;
};

export const deleteToken = async (id: number) => {
  const entry = await prisma.token.delete({
    where: {
      id,
    },
  });

  return entry;
};
