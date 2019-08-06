export function formatPercentage(value, invalidValue = 'n/a') {
  if (value === null) {
    return invalidValue;
  }
  return `${(value * 100).toFixed(2)}%`;
}
