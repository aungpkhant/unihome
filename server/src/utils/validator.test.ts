import {
  validateWeightageSumNotZero,
  validateWeightageNonNegative,
} from "./validator";

describe("validateWeightageSumNotZero", () => {
  test("should fail when all weightages are zero", () => {
    expect(
      validateWeightageSumNotZero({
        rent: 0,
        distance: 0,
        crime_rate: 0,
      })
    ).toBe(false);
  });

  test("should pass when one factor is > zero", () => {
    expect(
      validateWeightageSumNotZero({
        rent: 1,
        distance: 0,
        crime_rate: 0,
      })
    ).toBe(true);
  });

  test("should pass when all factors are non-zero", () => {
    expect(
      validateWeightageSumNotZero({
        rent: 2,
        distance: 2,
        crime_rate: 2,
      })
    ).toBe(true);
  });
});

describe("validateWeightageNonNegative", () => {
  test("should fail when one factor weightage is negative", () => {
    expect(
      validateWeightageNonNegative({
        rent: 0,
        distance: -1,
        crime_rate: 0,
      })
    ).toBe(false);
  });

  test("should fail when multiple factor weightages are negative", () => {
    expect(
      validateWeightageNonNegative({
        rent: -1,
        distance: -2,
        crime_rate: -3,
      })
    ).toBe(false);
  });

  test("should pass all factor weightages are positive", () => {
    expect(
      validateWeightageNonNegative({
        rent: 2,
        distance: 2,
        crime_rate: 2,
      })
    ).toBe(true);
  });
});
