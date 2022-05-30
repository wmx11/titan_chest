import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (raw: string, hash: string) => {
  return bcrypt.compareSync(raw, hash);
};

export const toDecimals = (number: number | string | null, decimals = 18): number => {
  if (number) {
    return parseInt(number, 10) / 10 ** decimals;
  }

  return 0;
};
