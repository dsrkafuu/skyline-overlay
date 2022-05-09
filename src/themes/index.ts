import './default.scss';
import './horiz.scss';
import './ikegami.scss';
import './jround.scss';

import _default from './default';
import horiz from './horiz';
import ikegami from './ikegami';
import jround from './jround';
import { CSS_VARS_DOM_ID } from '../utils/constants';

/**
 * `jobtype` and `job` must be defined at least once,
 * `theme` is optional
 */
export interface ColorsData {
  unknown: RGBAColor;
  self: RGBAColor;
  ticker: {
    cd: RGBAColor;
    c: RGBAColor;
    d: RGBAColor;
    oh: RGBAColor;
    h: RGBAColor;
    s: RGBAColor;
  };
  jobtype?: {
    dps: RGBAColor;
    tank: RGBAColor;
    heal: RGBAColor;
  };
  job?: {
    [key: string]: RGBAColor;
  };
  theme?: {
    [key: string]: RGBAColor;
  };
}

export interface ColorsPreset {
  key: string;
  name: string;
  data: ColorsData;
}

export default {
  default: { text: _default.name, data: _default },
  horiz: { text: horiz.name, data: horiz },
  ikegami: { text: ikegami.name, data: ikegami },
  jround: { text: jround.name, data: jround },
};

function toCSSRGBA(color: RGBAColor): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
}

/**
 * apply colors to dom css variables
 */
export function applyColors(colors: ColorsData) {
  const el = document.createElement('style');
  el.id = CSS_VARS_DOM_ID;
  let css = `--color-unknown: ${toCSSRGBA(colors.unknown)};\n`;
  css += `--color-self: ${toCSSRGBA(colors.self)};\n`;
  for (const key of Object.keys(colors.ticker)) {
    css += `--color-ticker-${key}: ${toCSSRGBA(
      colors.ticker[key as keyof typeof colors.ticker]
    )};\n`;
  }
  if (colors.jobtype) {
    for (const key of Object.keys(colors.jobtype)) {
      css += `--color-jobtype-${key}: ${toCSSRGBA(
        colors.jobtype[key as keyof typeof colors.jobtype]
      )};\n`;
    }
  }
  if (colors.job) {
    for (const key of Object.keys(colors.job)) {
      css += `--color-job-${key}: ${toCSSRGBA(
        colors.job[key as keyof typeof colors.job]
      )};\n`;
    }
  }
  if (colors.theme) {
    for (const key of Object.keys(colors.theme)) {
      css += `--color-theme-${key}: ${toCSSRGBA(
        colors.theme[key as keyof typeof colors.theme]
      )};\n`;
    }
  }
  css = `body {\n${css}}`;
  el.innerHTML = css;
  const preEl = document.getElementById(CSS_VARS_DOM_ID);
  if (preEl) {
    preEl.remove();
  } else {
    document.head.appendChild(el);
  }
}
