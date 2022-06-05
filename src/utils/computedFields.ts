import { ComputedField, ComputedFieldData } from '../types/ComputedFields';

export const totalSupply: ComputedField = {
  name: 'total_supply',
  compute: false,
  generate: ({ marketcap, price }: ComputedFieldData): number | null => {
    if (marketcap && price) {
      return marketcap / price;
    }

    return null;
  },
};

export const circulatingSupply: ComputedField = {
  name: 'circulating_supply',
  compute: false,
  generate: ({ marketcap, price, burned_tokens }: ComputedFieldData): number | null => {
    if (marketcap && price && burned_tokens) {
      return marketcap / price - burned_tokens;
    }

    return null;
  },
};

export const computedStatsFields = [totalSupply, circulatingSupply];
