// default (inter + noto)
const inter = `
  html,
  html[data-font='default'] {
    font-optical-sizing: auto;
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

// google (flex + noto)
const google = `
  html,
  html[data-font='google'] {
    font-optical-sizing: auto;
    font-family: Google Sans Flex, sans-serif;
  }
  html[lang='ja'],
  html[data-font='google'][lang='ja'] {
    font-family: Google Sans Flex, Noto Sans JP, sans-serif;
  }
  html[lang='zh'],
  html[data-font='google'][lang='zh'] {
    font-family: Google Sans Flex, Noto Sans SC, sans-serif;
  }
  html[lang='ko'],
  html[data-font='google'][lang='ko'] {
    font-family: Google Sans Flex, Noto Sans KR, sans-serif;
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
    src: url('${prefix}fonts/misans-4d009-normal-305.woff2') format('woff2');
  }
  @font-face {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('${prefix}fonts/misans-4d009-medium-380.woff2') format('woff2');
  }
  @font-face {
    font-family: 'MiSans';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('${prefix}fonts/misans-4d009-semibold-520.woff2') format('woff2');
  }
  html[data-font='misans'] {
    font-family: MiSans, sans-serif;
  }
`;

export const injectFont = (font: 'default' | 'google' | 'misans') => {
  let css = inter;
  if (font === 'google') css = google;
  if (font === 'misans') css = misans;
  let el: HTMLStyleElement | null = document.querySelector('#skyline-fonts');
  if (el) {
    el.innerHTML = css;
  } else {
    el = document.createElement('style');
    el.innerHTML = css;
    document.head.appendChild(el);
  }
};
