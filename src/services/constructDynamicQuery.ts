import { Stats } from '@prisma/client';
import { ComputedField, ComputedFieldData, DynamicQueryType } from '../types/ComputedFields';
import { Payload } from '../types/Stats';
import { computedStatsFields } from '../utils/computedFields';

const separator = ',';
const getIsMultiple = (item: string): boolean => item.indexOf(separator) > -1;

const getLastDayQuery = (): { created_at: { lte: Date } } => {
  return {
    created_at: {
      lte: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  };
};

const getSelections = (select: string): object | Record<string, never> => {
  if (!select) {
    return {};
  }

  const isMultiple: boolean = getIsMultiple(select);

  if (isMultiple) {
    return select.split(separator).reduce(
      (obj: { select: object | Record<string, never> }, item: string): { select: object | Record<string, never> } => {
        Object.assign(obj.select, { [item]: true });
        return obj;
      },
      { select: {} },
    );
  }

  if (!isMultiple) {
    return { select: { [select]: true } };
  }

  return {};
};

const constructQuery = (payload: Payload): DynamicQueryType | Record<string, never> => {
  const query = {};

  if (!payload) {
    return query;
  }

  // Add initial take: 1 and OrdereBy
  Object.assign(query, { take: 1, orderBy: [{ created_at: 'desc' }] });

  if (payload.type && payload.value) {
    Object.assign(query, { where: { [payload.type]: payload.value } });
  }

  if (payload.last_day) {
    Object.assign(query, { where: { ...getLastDayQuery() } });
  }

  if (payload.limit) {
    Object.assign(query, { take: parseInt(payload.limit, 10) || 1 });
  }

  if (payload.order) {
    Object.assign(query, { orderBy: [{ created_at: payload.order || 'desc' }] });
  }

  if (payload.select) {
    Object.assign(query, { ...getSelections(payload.select) });
  }

  return query;
};

const generateComputedFields = (payload: Payload, results: Stats[] | null): Stats[] => {
  const generators: ComputedField[] = [];

  if (!payload || !results) {
    return [];
  }

  if (!payload.compute) {
    return results;
  }

  const isMultiple: boolean = getIsMultiple(payload.compute);

  const filterFieldGeneratorsByName = (name: string): ComputedField | undefined =>
    computedStatsFields.find((field: ComputedField) => field.name === name);

  const assignGeneratedData = (generator: ComputedField, result: ComputedFieldData): object =>
    Object.assign(result, { [generator.name]: generator.generate(result) });

  if (isMultiple) {
    payload.compute.split(separator).forEach((fieldName: string): void => {
      const generator: ComputedField | undefined = filterFieldGeneratorsByName(fieldName);
      generators.push(generator as ComputedField);
    });
  }

  if (!isMultiple) {
    const generator: ComputedField | undefined = filterFieldGeneratorsByName(payload.compute);
    generators.push(generator as ComputedField);
  }

  return results.map((item) => {
    const result = { ...item };
    generators.forEach((generator: ComputedField) => assignGeneratedData(generator, result));
    return result;
  });
};

const forStats = (payload: Payload): DynamicQueryType | Record<string, never> => {
  const query: DynamicQueryType | Record<string, never> = constructQuery(payload);

  if (!query) {
    return {};
  }

  return {
    query,
    generateComputedFields,
  };
};

const constructDynamicQuery = (payload: Payload, type: string): DynamicQueryType | Record<string, never> => {
  switch (type) {
    case 'stats':
      return forStats(payload);
    default:
      return {};
  }
};

export default constructDynamicQuery;
