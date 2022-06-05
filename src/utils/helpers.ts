import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (raw: string, hash: string): boolean => {
  return bcrypt.compareSync(raw, hash);
};

export const toDecimals = (number: number | string | null, decimals = 18): number => {
  if (typeof number === 'string' && number !== null) {
    return parseInt(number, 10) / 10 ** decimals;
  }

  if (number !== null) {
    return number / 10 ** decimals;
  }

  return 0;
};
