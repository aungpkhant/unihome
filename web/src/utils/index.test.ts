import { getQuickSearchWeightage } from './index';

describe('getQuickSearchWeightage', () => {
  test('scores the priority factor as higher compared to other factors', () => {
    const weightages = getQuickSearchWeightage('rent');

    expect(weightages.rent > weightages.crime_rate && weightages.rent > weightages.distance);
  });

  test('scores the factors equally when an empty string / no factor is passed', () => {
    const weightages = getQuickSearchWeightage('');

    const factorWeightage = weightages['rent'];

    let allWeightagesSame = Object.values(weightages).every((w) => w === factorWeightage);

    expect(allWeightagesSame).toBe(true);
  });
});
