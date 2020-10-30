/**
 * split dps/hps number
 * @param {String} str
 * @returns {String}
 */
function splitNumber(str) {
  if (!str) {
    return '';
  }
  const arr = str.split('.');
  if (Array.isArray(arr) && arr.length === 2) {
    return arr[0];
  } else {
    return str;
  }
}

export default splitNumber;
