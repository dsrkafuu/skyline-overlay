import {
  JobType,
  CombatantData,
  EncounterData,
  LimitBreakData,
  EventData,
  ExtendData,
} from '../types';
import { getPctNum, getInt } from '../utils/getter';
import { logWarn } from '../utils/logger';

type AnyRecord = Record<string, unknown>;

function asRecord(input: unknown): AnyRecord | null {
  if (typeof input === 'object' && input !== null) {
    return input as AnyRecord;
  }
  return null;
}

function getField(data: AnyRecord | null, ...keys: string[]) {
  if (!data) return undefined;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data[key];
    }
  }
  return undefined;
}

function getStringField(data: AnyRecord | null, ...keys: string[]) {
  const value = getField(data, ...keys);
  if (value === null || value === undefined) {
    return '';
  }
  return `${value}`;
}

function getIntField(data: AnyRecord | null, ...keys: string[]) {
  return getInt(getStringField(data, ...keys));
}

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
function parsePlayer(input: unknown): CombatantData {
  const data = asRecord(input);

  let [maxHit, maxHitDamage] = ['', 0];
  const maxHitData = getStringField(data, 'maxhit').split('-');
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
    maxHitDamage = getInt(maxHitData[1]);
  }

  let [maxHeal, maxHealDamage] = ['', 0];
  const maxHealData = getStringField(data, 'maxheal').split('-');
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
    maxHealDamage = getInt(maxHealData[1]);
  }

  const jobParsed = parseJob(getStringField(data, 'Job', 'job'));
  const healed = getIntField(data, 'healed');
  const shield = getIntField(data, 'damageShield');
  const healedPct = getStringField(data, 'healed%');

  return {
    name: getStringField(data, 'name'),

    job: jobParsed.name,
    jobType: jobParsed.type,

    dps: getIntField(data, 'encdps'),
    last10DPS: getIntField(data, 'Last10DPS'),
    last30DPS: getIntField(data, 'Last30DPS'),
    last60DPS: getIntField(data, 'Last60DPS'),
    hps: getIntField(data, 'enchps'),

    swings: getIntField(data, 'swings'),
    hits: getIntField(data, 'hits'),
    deaths: getIntField(data, 'deaths'),

    directHits: getIntField(data, 'DirectHitCount'),
    directHitPct: getStringField(data, 'DirectHitPct'),
    critHits: getIntField(data, 'crithits'),
    critHitPct: getStringField(data, 'crithit%'),
    directCritHits: getIntField(data, 'CritDirectHitCount'),
    directCritHitPct: getStringField(data, 'CritDirectHitPct'),

    damage: getIntField(data, 'damage'),
    damageTaken: getIntField(data, 'damagetaken'),
    damagePct: getStringField(data, 'damage%'),

    healed,
    healsTaken: getIntField(data, 'healstaken'),
    healsPct: healedPct, // this includes shield pct
    overHeal: getIntField(data, 'overHeal'),
    overHealPct: getStringField(data, 'OverHealPct'),
    shield,
    shieldPct: `${Math.round((shield / healed || 0) * getPctNum(healedPct)) || 0}%`,

    maxHit,
    maxHitDamage,
    maxHeal,
    maxHealDamage,
  };
}

/**
 * parse encounter data
 */
function parseEncounter(input: unknown): EncounterData {
  const data = asRecord(input);

  return {
    duration: getStringField(data, 'duration'),
    durationSeconds: getIntField(data, 'DURATION'),
    zoneName: getStringField(data, 'CurrentZoneName'),

    dps: getIntField(data, 'encdps'),
    last10DPS: getIntField(data, 'Last10DPS'),
    last30DPS: getIntField(data, 'Last30DPS'),
    last60DPS: getIntField(data, 'Last60DPS'),
    hps: getIntField(data, 'enchps'),

    damage: getIntField(data, 'damage'),
    healed: getIntField(data, 'healed'),
  };
}

/**
 * parse LB data
 */
function parseLimitBreak(input: unknown): LimitBreakData {
  const data = asRecord(input);

  let maxHit = '';
  const maxHitData = getStringField(data, 'maxhit').split('-');
  if (maxHitData.length > 1) {
    maxHit = maxHitData[0];
  }

  let maxHeal = '';
  const maxHealData = getStringField(data, 'maxheal').split('-');
  if (maxHealData.length > 1) {
    maxHeal = maxHealData[0];
  }

  return {
    name: 'Limit Break',

    dps: getIntField(data, 'encdps'),
    hps: getIntField(data, 'enchps'),

    damage: getIntField(data, 'damage'),
    healed: getIntField(data, 'healed'),

    maxHit,
    maxHeal,
  };
}

function parseCombatants(input: unknown, parsedData: ExtendData) {
  const data = asRecord(input);
  if (!data) {
    logWarn('injectExtendData::invalidCombatantPayload', input);
    return;
  }

  const combatantKeys = Object.keys(data);
  combatantKeys.forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      return;
    }
    const value = data[key];
    if (key === 'Limit Break') {
      parsedData.limitBreak = parseLimitBreak(value);
      return;
    }
    parsedData.combatant.push(parsePlayer(value));
  });
}

/**
 * inject extended data
 */
function injectExtendData(data: EventData): EventData {
  if (data.type === 'CombatData') {
    const source = asRecord(data);
    // common data
    const parsedData: ExtendData = {
      active:
        getStringField(source, 'isActive').toLowerCase() === 'true' ||
        getField(source, 'isActive') === true,
      encounter: parseEncounter(getField(source, 'Encounter')),
      combatant: [],
    };

    // combatant
    parseCombatants(getField(source, 'Combatant'), parsedData);

    data.extendData = parsedData;
  }
  return data;
}

export default injectExtendData;
