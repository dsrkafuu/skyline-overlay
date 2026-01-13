import { mergeCombatant, CombatantData } from '@/api';
import { version, versionCode } from '@/assets/meta';

/**
 * format number
 */
export function fmtNumber(
  number: number,
  shortNumber = false,
  bigNumberMode = false
) {
  const decimal = 1;

  if (typeof number !== 'number') {
    number = Number(number);
  }

  if (bigNumberMode) {
    number = number * 10;
  }
  if (!shortNumber) {
    return number ? `${number}` : '0';
  }

  let sign = '';
  if (number < 0) {
    sign = '-';
  }

  number = Math.abs(number);

  let numberString: string;
  switch (true) {
    case number < 1e4:
      numberString = number.toFixed(0);
      break;
    case number < 1e7:
      numberString = `${Number((number / 1e3).toFixed(decimal))}k`;
      break;
    case number < 1e10:
      numberString = `${Number((number / 1e6).toFixed(decimal))}m`;
      break;
    default:
      numberString = `${Number(number.toFixed(decimal))}`;
  }

  return `${sign}${numberString}`;
}

interface PetMergeTempMap {
  [key: string]: {
    player: CombatantData;
    pets: CombatantData[];
  };
}

/**
 * merge pet data into player
 */
export function fmtMergePet(combatant: CombatantData[] = [], yid = 'YOU') {
  const players = combatant;
  const map: PetMergeTempMap = {};

  // init all players
  for (let i = 0; i < players.length; i++) {
    const player = players[i];

    if (!/\([^)]+\)/gi.exec(player.name)) {
      if (player.name === 'YOU') {
        map[yid] = { player: player, pets: [] };
      } else {
        map[player.name] = { player: player, pets: [] };
      }
    }
  }

  // init all pets
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const owner = /\(([^)]+)\)/gi.exec(player.name);
    if (owner && owner[1]) {
      let name = owner[1];
      name === 'YOU' && (name = yid);
      if (map[name] && map[name].pets) {
        map[name].pets.push(player);
      }
    }
  }

  // merge all players
  const ret: CombatantData[] = [];
  for (const name of Object.keys(map)) {
    const res = mergeCombatant(map[name].player, ...map[name].pets);
    res && ret.push(res);
  }
  return ret;
}

export function fmtDuration(duration: string) {
  let _duration = duration || '00:00';
  const time = _duration.split(':');
  if (time.length === 3) {
    // add hours to minutes
    const hours = Number.parseInt(time[0], 10);
    let minutes = Number.parseInt(time[1], 10);
    minutes = minutes + hours * 60;
    if (minutes > 99) {
      _duration = '99:59';
    } else {
      _duration = `${minutes}:${time[2]}`;
    }
  } else if (time.length > 3) {
    _duration = '99:59';
  }
  return _duration;
}

export function fmtZoneName(zoneName: string) {
  return zoneName || `Skyline Overlay ${version} (${versionCode})`;
}
