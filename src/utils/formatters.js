/**
 * format number
 * @param {number} number
 * @param {number} decimal
 * @return {string}
 */
export function fmtNumber(number, decimal = 1) {
  if (typeof number !== 'number') {
    number = Number(number);
  }

  let sign = '';
  if (number < 0) {
    sign = '-';
  }

  number = Math.abs(number);

  switch (true) {
    case number < 1e4:
      number = number.toFixed(0);
      break;
    case number < 1e7:
      number = `${(number / 1e3).toFixed(decimal)}k`;
      break;
    case number < 1e10:
      number = `${(number / 1e6).toFixed(decimal)}m`;
      break;
    default:
      number = number.toFixed(decimal);
  }

  return `${sign}${number}`;
}
