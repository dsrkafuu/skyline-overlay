import {
  JobType,
  CombatantData,
  EncounterData,
  LimitBreakData,
  EventData,
  ExtendData,
} from '../types';
import { getPctNum, getInt } from '../utils/getter';

/**
 * parse job type
 */
function parseJob(jobName: string): { name: string; type: JobType } {
  jobName = jobName.toLowerCase();

  const dps = [
    // base
    'acn',
    'arc',
    'lnc',
    'pgl',
    'rog',
    'thm',
    // melee
    'drg',
    'mnk',
    'nin',
    'sam',
    'rpr',
    'vpr',
    // magical ranged
    'smn',
    'blm',
    'rdm',
    'pct',
    // physical ranged
    'brd',
    'mch',
    'dnc',
    // special
    'blu',
  ];
  const healer = [
    // base
    'cnj',
    // add
    'whm',
    'sch',
    'ast',
    'sge',
  ];
  const tank = [
    // base
    'gla',
    'mrd',
    // add
    'pld',
    'war',
    'drk',
    'gnb',
  ];

  const hand = ['crp', 'bsm', 'arm', 'gsm', 'lwr', 'wvr', 'alc', 'cul'];
  const land = ['bot', 'fsh', 'min'];

  if (dps.includes(jobName)) {
    return { name: jobName, type: 'dps' };
  } else if (healer.includes(jobName)) {
    return { name: jobName, type: 'healer' };
  } else if (tank.includes(jobName)) {
    return { name: jobName, type: 'tank' };
  } else if (hand.includes(jobName)) {
    return { name: jobName, type: 'hand' };
  } else if (land.includes(jobName)) {
    return { name: jobName, type: 'land' };
  } else {
    return { name: jobName || 'unknown', type: 'unknown' };
  }
}

/**
 * parse single player
 */
function parsePlayer(data: any): CombatantData {
  let [maxHit, maxHitDamage] = ['', 0];
  const maxHitData = (data.maxhit || '').split('-');
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
    maxHitDamage = getInt(maxHitData[1]);
  }
  let [maxHeal, maxHealDamage] = ['', 0];
  const maxHealData = (data.maxheal || '').split('-');
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
    maxHealDamage = getInt(maxHealData[1]);
  }

  const jobParsed = parseJob(data.Job || '');

  return {
    name: data.name,

    job: jobParsed.name,
    jobType: jobParsed.type,

    dps: getInt(data.encdps),
    last10DPS: getInt(data.Last10DPS),
    last30DPS: getInt(data.Last30DPS),
    last60DPS: getInt(data.Last60DPS),
    hps: getInt(data.enchps),

    swings: getInt(data.swings),
    hits: getInt(data.hits),
    deaths: getInt(data.deaths),

    directHits: getInt(data.DirectHitCount),
    directHitPct: data.DirectHitPct || '',
    critHits: getInt(data.crithits),
    critHitPct: data['crithit%'] || '',
    directCritHits: getInt(data.CritDirectHitCount),
    directCritHitPct: data.CritDirectHitPct || '',

    damage: getInt(data.damage),
    damageTaken: getInt(data.damagetaken),
    damagePct: data['damage%'] || '',

    healed: getInt(data.healed),
    healsTaken: getInt(data.healstaken),
    healsPct: data['healed%'] || '', // this includes shield pct
    overHeal: getInt(data.overHeal),
    overHealPct: data.OverHealPct || '',
    shield: getInt(data.damageShield),
    shieldPct: `${
      Math.round(
        (getInt(data.damageShield) / getInt(data.healed) || 0) *
          getPctNum(data['healed%'] || '')
      ) || 0
    }%`,

    maxHit,
    maxHitDamage,
    maxHeal,
    maxHealDamage,
  };
}

/**
 * parse encounter data
 */
function parseEncounter(data: any): EncounterData {
  return {
    duration: data.duration || '',
    durationSeconds: getInt(data.DURATION),
    zoneName: data.CurrentZoneName || '',

    dps: getInt(data.encdps),
    last10DPS: getInt(data.Last10DPS),
    last30DPS: getInt(data.Last30DPS),
    last60DPS: getInt(data.Last60DPS),
    hps: getInt(data.enchps),

    damage: getInt(data.damage),
    healed: getInt(data.healed),
    shield: getInt(data.damageShield),
  };
}

/**
 * parse LB data
 */
function parseLimitBreak(data: any): LimitBreakData {
  let maxHit = '';
  const maxHitData = (data.maxhit || '').split('-');
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
  }
  let maxHeal = '';
  const maxHealData = (data.maxheal || '').split('-');
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
  }

  return {
    name: 'Limit Break',

    dps: getInt(data.encdps),
    hps: getInt(data.enchps),

    damage: getInt(data.damage),
    healed: getInt(data.healed),
    shield: getInt(data.damageShield),

    maxHit,
    maxHeal,
  };
}

/**
 * inject extended data
 */
function injectExtendData(data: EventData): EventData {
  if (data.type === 'CombatData') {
    // common data
    const parsedData: ExtendData = {
      active: data.isActive === 'true' || data.isActive === true,
      encounter: parseEncounter(data.Encounter),
      combatant: [],
    };

    // combatant
    const combatantKeys = Object.keys(data.Combatant);
    const combatantValidKeys = combatantKeys.filter((key) =>
      Object.prototype.hasOwnProperty.call(data.Combatant, key)
    );
    combatantValidKeys.forEach((key) => {
      if (key === 'Limit Break') {
        parsedData.limitBreak = parseLimitBreak(data.Combatant[key]);
      } else {
        parsedData.combatant.push(parsePlayer(data.Combatant[key]));
      }
    });

    data.extendData = parsedData;
  }
  return data;
}

export default injectExtendData;
