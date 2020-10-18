export default (str) => {
  const arr = str.split('.');
  if (arr && arr.length === 2) {
    return arr[0];
  } else {
    return str;
  }
};
