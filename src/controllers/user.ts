import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Response } from '../types/Response';

import { UserNamePassword, UserLoginState } from '../types/User';
import { comparePassword, hashPassword } from '../utils/helpers';

const prisma = new PrismaClient();

export const login = async (user: UserNamePassword): Promise<UserLoginState | Response> => {
  const { name, password } = user;

  const existingUser: User | null = await prisma.user.findFirst({
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

  const isPasswordMatching: boolean = comparePassword(password, existingUser.password);

  if (isPasswordMatching) {
    const secret: string = process.env.ACCESS_TOKEN_SECRET || 'secret';
    const accessToken: string = jwt.sign({ name }, secret, { expiresIn: '30 minutes' });

    return {
      status: 200,
      message: 'Login successful',
      user: {
        id: existingUser.id,
        name: existingUser.name,
        token: accessToken,
      },
    };
  }

  return {
    status: 400,
    message: 'Incorrect password',
  };
};

export const register = async (user: UserNamePassword): Promise<Response> => {
  const { name, password } = user;

  const existingUser: User | null = await prisma.user.findFirst({
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

  const hashedPassword: string = hashPassword(password);

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

export const getAllUsers = async (): Promise<object> => {
  return {
    message: 'lmao',
  };
};

export const getUserById = async () => {};

export const addUser = async () => {};

export const updateUser = async () => {};

export const deleteUser = async () => {};
