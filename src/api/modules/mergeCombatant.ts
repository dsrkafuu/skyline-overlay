import {
  addNumber,
  addPct,
  addMax,
  addHitPct,
  addOverHealPct,
  HitData,
  MaxHitData,
} from '../utils/adder';
import { CombatantData } from '../types';

function mergeCombatant(...args: CombatantData[]) {
  if (!args.length) {
    return null;
  }

  const dps: number[] = [];
  const last10DPS: number[] = [];
  const last30DPS: number[] = [];
  const last60DPS: number[] = [];
  const hps: number[] = [];

  const swings: number[] = [];
  const hits: number[] = [];
  const deaths: number[] = [];

  const direct: HitData[] = [];
  const crit: HitData[] = [];
  const directCrit: HitData[] = [];

  const damage: number[] = [];
  const damageTaken: number[] = [];
  const damagePct: string[] = [];

  const healed: number[] = [];
  const healsTaken: number[] = [];
  const healsPct: string[] = [];
  const overHeal: number[] = [];
  const overHealPct: string[] = [];

  const maxHit: MaxHitData[] = [];
  const maxHeal: MaxHitData[] = [];

  args.forEach((item) => {
    dps.push(item.dps);
    last10DPS.push(item.last10DPS);
    last30DPS.push(item.last30DPS);
    last60DPS.push(item.last60DPS);
    hps.push(item.hps);

    swings.push(item.swings);
    hits.push(item.hits);
    deaths.push(item.deaths);

    direct.push({ hits: item.directHits, totalHits: item.hits });
    crit.push({ hits: item.critHits, totalHits: item.hits });
    directCrit.push({ hits: item.directCritHits, totalHits: item.hits });

    damage.push(item.damage);
    damageTaken.push(item.damageTaken);
    damagePct.push(item.damagePct);

    healed.push(item.healed);
    healsTaken.push(item.healsTaken);
    healsPct.push(item.healsPct);
    overHeal.push(item.overHeal);
    overHealPct.push(item.overHealPct);

    maxHit.push({ hit: item.maxHit, hitDamage: item.maxHitDamage });
    maxHeal.push({ hit: item.maxHeal, hitDamage: item.maxHealDamage });
  });

  const ret: CombatantData = {
    name: args[0].name,

    job: args[0].job,
    jobType: args[0].jobType,

    dps: addNumber(...dps),
    last10DPS: addNumber(...last10DPS),
    last30DPS: addNumber(...last30DPS),
    last60DPS: addNumber(...last60DPS),
    hps: addNumber(...hps),

    swings: addNumber(...swings),
    hits: addNumber(...hits),
    deaths: addNumber(...deaths),

    damage: addNumber(...damage),
    damageTaken: addNumber(...damageTaken),
    damagePct: addPct(...damagePct),

    healed: addNumber(...healed),
    healsTaken: addNumber(...healsTaken),
    healsPct: addPct(...healsPct),
    overHeal: addNumber(...overHeal),
    overHealPct: addOverHealPct(...overHealPct),
  } as CombatantData;

  let hitTemp = addHitPct(...direct);
  ret.directHits = hitTemp.hits;
  ret.directHitPct = hitTemp.hitPct;
  hitTemp = addHitPct(...crit);
  ret.critHits = hitTemp.hits;
  ret.critHitPct = hitTemp.hitPct;
  hitTemp = addHitPct(...directCrit);
  ret.directCritHits = hitTemp.hits;
  ret.directCritHitPct = hitTemp.hitPct;

  let maxHitTemp = addMax(...maxHit);
  ret.maxHit = maxHitTemp.hit;
  ret.maxHitDamage = maxHitTemp.hitDamage;
  maxHitTemp = addMax(...maxHeal);
  ret.maxHeal = maxHitTemp.hit;
  ret.maxHealDamage = maxHitTemp.hitDamage;

  return ret;
}

export default mergeCombatant;
