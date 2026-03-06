/*! ffxiv-overlay-plugin | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
/* source `common.js` 5a72f36 */
/* https://github.com/OverlayPlugin/OverlayPlugin/blob/main/docs/assets/shared/common.js */
import { OverlayAPI } from './overlay';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.OverlayAPI = OverlayAPI;
}

export { OverlayAPI };
export { default as isCEFSharp } from './modules/isCEFSharp';
export { class2job, job2class } from './modules/jobClassConversion';
export { default as mergeCombatant } from './modules/mergeCombatant';

export type {
  JobType,
  EncounterData,
  LimitBreakData,
  CombatantData,
  ExtendData,
  EventType,
  EventData,
  EventCallback,
} from './types';
