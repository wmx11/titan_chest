import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { User } from '../types/User';
import { comparePassword, hashPassword } from '../utils/helpers';

const prisma = new PrismaClient();

export const login = async (user: User) => {
  const { name, password } = user;

  const existingUser = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (!existingUser) {
    return {
      status: 400,
      message: 'User does not exist',
    };
  }

  const isPasswordMatching = comparePassword(password, existingUser.password);

  if (isPasswordMatching) {
    const secret = process.env.ACCESS_TOKEN_SECRET || 'secret';
    const accessToken = jwt.sign({ name }, secret, { expiresIn: '30 minutes' });

    return {
      status: 200,
      accessToken,
    };
  }

  return {
    status: 400,
    message: 'Incorrect password',
  };
};

export const register = async (user: User) => {
  const { name, password } = user;

  const existingUser = await prisma.user.findFirst({
    where: {
      name,
    },
  });

  if (existingUser) {
    return {
      status: 400,
      message: 'User already exists',
    };
  }

  const hashedPassword = hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
    },
  });

  return {
    status: 200,
    message: `${name} successfully registered`,
  };
};

export const getAllUsers = async () => {
  return {
    message: 'lmao',
  };
};

export const getUserById = async () => {};

export const addUser = async () => {};

export const updateUser = async () => {};

export const deleteUser = async () => {};
