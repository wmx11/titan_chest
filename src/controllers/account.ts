import { toDecimals } from '../utils/helpers';
import titanoContract from '../web3/titanoContract';

export const getBalance = async (address: string): Promise<string | number> => {
  const { contractMethodCall } = await titanoContract();

  if (!address) {
    throw new Error('No address found');
  }

  if (!address.startsWith('0x') || address.length > 42) {
    throw new Error('Invalid address type');
  }

  const balance = await contractMethodCall('balanceOf', [address.trim()]);
  const decimals = await contractMethodCall('decimals', []);

  if (balance && decimals) {
    const balanceToDecimals = toDecimals(balance, decimals as number);
    return balanceToDecimals;
  }

  throw new Error('No balance found for the given address');
};
