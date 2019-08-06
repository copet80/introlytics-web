export function createArrayIndices(min = 0, max = 10) {
  const result = [];
  for (let i = min; i < max; i++) {
    result.push(i);
  }
  return result;
}
