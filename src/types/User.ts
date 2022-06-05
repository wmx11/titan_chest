import { Response } from './Response';

export type User = {
  name: string;
  password: string;
  api_key?: string;
};

type UserLogin = {
  id: number;
  name: string;
  token: string;
};

export type UserNamePassword = {
  name: string;
  password: string;
};

export type UserLoginState = Response & {
  user: UserLogin;
};
