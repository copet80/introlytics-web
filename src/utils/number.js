/**
 * Formats value as number.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 *
 * @param {*} value
 * @param {object} param1
 */
export function formatNumber(value, { locale = 'en-AU', ...options } = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function isNumber(value) {
  return !isNaN(parseFloat(value));
}
