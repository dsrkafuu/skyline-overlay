export function getInt(input: string | number) {
  const toInt = Number.parseInt || window.parseInt;
  return toInt(`${input}`) || 0;
}

/**
 * get number from pct string
 */
export function getPctNum(str: string) {
  const exp = /([0-9]+)%/gi.exec(str);
  if (exp && exp[1]) {
    return getInt(exp[1]) || 0;
  }
  return 0;
}
