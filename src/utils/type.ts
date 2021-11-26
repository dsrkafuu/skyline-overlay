import { CombatantData, LimitBreakData } from 'ffxiv-overlay-api';

export function isCombatantData(player: CombatantData | LimitBreakData): player is CombatantData {
  const { directHitPct: d, critHitPct: c, directCritHitPct: dc } = player as CombatantData;
  return d !== undefined && c !== undefined && dc !== undefined && player.name !== 'Limit Break';
}

export function isLimitBreakData(player: CombatantData | LimitBreakData): player is LimitBreakData {
  return player.name === 'Limit Break';
}
