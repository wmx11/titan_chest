import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (raw: string, hash: string) => {
  return bcrypt.compareSync(raw, hash);
};

export const toDecimals = (number: number, decimals = 18) => number / 10 ** decimals;
