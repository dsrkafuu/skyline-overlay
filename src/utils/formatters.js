import cloneDeep from 'lodash/cloneDeep';
import OverlayAPI from 'ffxiv-overlay-api';

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

/**
 * merge pet data into player
 * @param {import('ffxiv-overlay-api').CombatantData[]} combatant
 * @param {string} combatant
 * @return {any[]}
 */
export function fmtMergePet(combatant = [], yid = 'YOU') {
  const map = {};
  // init all players
  for (let i = 0; i < combatant.length; i++) {
    const player = combatant[i];
    if (!/\([^)]+\)/gi.exec(player.name)) {
      if (player.name === 'YOU') {
        map[yid] = { player: cloneDeep(player), pets: [] };
      } else {
        map[player.name] = { player: cloneDeep(player), pets: [] };
      }
    }
  }
  // init all pets
  for (let i = 0; i < combatant.length; i++) {
    const player = combatant[i];
    const owner = /\(([^)]+)\)/gi.exec(player.name);
    if (owner && owner[1]) {
      let name = owner[1];
      name === 'YOU' && (name = yid);
      if (map[name] && map[name].pets) {
        map[name].pets.push(cloneDeep(player));
      }
    }
  }

  const ret = [];
  for (const name of Object.keys(map)) {
    const res = OverlayAPI.mergeCombatant(map[name].player, ...map[name].pets);
    res && ret.push(res);
  }
  return ret;
}
