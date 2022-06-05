import { Stats } from '@prisma/client';
import { Payload } from './Stats';

export type ComputedFieldData = {
  marketcap: number | null;
  price: number | null;
  burned_tokens: number | null;
};

export type ComputedField = {
  name: string;
  compute: boolean;
  generate: (data: ComputedFieldData) => number | null;
};

type Query = {
  created_at?: object;
  where?: object;
  take?: number;
  orderBy?: object[];
};

export type DynamicQueryType = {
  query: Query | object;
  generateComputedFields: (payload: Payload, results: Stats[] | null) => Stats[];
};
