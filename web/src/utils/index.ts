import { Factor, IFactorWeightages } from 'types';

const baseWeightages: IFactorWeightages = {
  rent: 2,
  crime_rate: 2,
  distance: 2,
};

export const getQuickSearchWeightage = (priorityFactor: Factor | ''): IFactorWeightages => {
  if (!priorityFactor) {
    return baseWeightages;
  }

  return {
    ...baseWeightages,
    [priorityFactor]: 4,
  };
};
