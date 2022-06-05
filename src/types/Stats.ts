import { Prisma } from '@prisma/client';

export type Payload = {
  type: string | null;
  value: string | number | null;
  last_day?: string | string[] | null;
  limit?: string | null;
  select?: string | null;
  order?: Prisma.SortOrder | null;
  compute?: string | null;
};
