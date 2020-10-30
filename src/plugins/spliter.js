/**
 * split dps/hps number
 * @param {String} str
 */
function spliter(str) {
  if (!str) {
    return '';
  }
  const arr = str.split('.');
  if (arr && arr.length === 2) {
    return arr[0];
  } else {
    return str;
  }
}

export default spliter;
