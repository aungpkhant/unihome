export function validateWeightageSumNotZero(factors: Record<string, number>) {
  return !Object.keys(factors).every((factor_key) => factors[factor_key] === 0);
}

export function validateWeightageNonNegative(factors: Record<string, number>) {
  return Object.keys(factors).every((factor_key) => factors[factor_key] >= 0);
}
