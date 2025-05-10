// default
// files by Google Fonts in `index.html`
const google = `
  html,
  html[data-font='default'] {
    font-family: Inter, sans-serif;
  }
  html[lang='ja'],
  html[data-font='default'][lang='ja'] {
    font-family: Inter, Noto Sans JP, sans-serif;
  }
  html[lang='zh'],
  html[data-font='default'][lang='zh'] {
    font-family: Inter, Noto Sans SC, sans-serif;
  }
  html[lang='ko'],
  html[data-font='default'][lang='ko'] {
    font-family: Inter, Noto Sans KR, sans-serif;
  }
`;

// misans
const base = import.meta.env.BASE_URL ?? '';
const prefix = base.endsWith('/') ? base : base + '/';
const misans = `
  @font-face {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('${prefix}fonts/misans-light-85af4bde.woff2') format('woff2');
  }
  @font-face {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('${prefix}fonts/misans-regular-dd4485f3.woff2') format('woff2');
  }
  @font-face {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('${prefix}fonts/misans-medium-7f4338c1.woff2') format('woff2');
  }
  html[data-font='misans'] {
    font-family: MiSans, sans-serif;
  }
`;

export const injectFont = (font: 'default' | 'misans') => {
  const css = font === 'misans' ? misans : google;
  let el: HTMLStyleElement | null = document.querySelector('#skyline-fonts');
  if (el) {
    el.innerHTML = css;
  } else {
    el = document.createElement('style');
    el.innerHTML = css;
    document.head.appendChild(el);
  }
};
