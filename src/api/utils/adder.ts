import { getPctNum } from './getter';

export function addNumber(...args: number[]) {
  if (!args.length) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i] || 0;
  }
  return sum;
}

/**
 * damagePct, healsPct, etc.
 */
export function addPct(...args: string[]) {
  if (!args.length) {
    return '0%';
  }
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    const num = getPctNum(args[i]);
    sum += num;
  }
  return `${sum}%`;
}

export interface HitData {
  hits: number; // this type of hit number
  totalHits: number; // total number of hits
}
/**
 * directHitPct, critHitPct, etc.
 */
export function addHitPct(...args: HitData[]) {
  if (!args.length) {
    return { hits: 0, hitPct: '0%' };
  }
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < args.length; i++) {
    numerator += args[i].hits || 0;
    denominator += args[i].totalHits || 0;
  }
  if (denominator === 0 || numerator === 0) {
    return { hits: 0, hitPct: '0%' };
  }
  return {
    hits: numerator,
    hitPct: `${Math.round((numerator / denominator) * 100)}%`,
  };
}

export function addOverHealPct(...args: string[]) {
  if (!args.length) {
    return '0%';
  }
  let tsum = 0;
  let tnum = 0;
  for (let i = 0; i < args.length; i++) {
    const num = getPctNum(args[i]);
    if (num > 0) {
      tsum += num;
      tnum++;
    }
  }
  if (tnum === 0) {
    return '0%';
  }
  return `${Math.round(tsum / tnum)}%`;
}

export interface MaxHitData {
  hit: string;
  hitDamage: number;
}
/**
 * maxHit, maxHeal, etc.
 */
export function addMax(...args: MaxHitData[]): MaxHitData {
  if (!args.length) {
    return { hit: '', hitDamage: 0 };
  }
  let max = { hit: '', hitDamage: 0 };
  for (let i = 0; i < args.length; i++) {
    if (args[i].hitDamage > max.hitDamage) {
      max = args[i];
    }
  }
  return max;
}
