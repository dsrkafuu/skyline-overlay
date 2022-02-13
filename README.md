<h1 align="center">
  <img src="https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/main/assets/logo.svg" alt="Skyline Logo" width="128" /><br />
  Skyline Overlay
  <br />
</h1>

<h4 align="center">A modern customizable horizon FFXIV miniparse overlay.</h4>
<br />

![](https://img.shields.io/github/package-json/v/dsrkafuu/skyline-overlay)
![](https://img.shields.io/badge/ffxiv-endwalker-orange)
[![](https://img.shields.io/github/license/dsrkafuu/skyline-overlay)](https://github.com/dsrkafuu/skyline-overlay/blob/main/LICENSE)
[![](https://img.shields.io/lgtm/grade/javascript/github/dsrkafuu/skyline-overlay)](https://lgtm.com/projects/g/dsrkafuu/skyline-overlay/context:javascript)

An extended horizon overlay like [horizoverlay](https://github.com/bsides/horizoverlay/) with some of [ikegami](https://github.com/hibiyasleep/ikegami)'s features. The project is based on React with MobX & Vite, and the dedicated [ffxiv-overlay-api](https://github.com/dsrkafuu/ffxiv-overlay-api).

<img align="center" src="https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/main/assets/preview-en-v3.jpg" alt="Skyline Preview" />

## Overlay Link

- CloudFlare (Global): `https://skyline.dsrkafuu.net`
- Mirror (CN DieMoe Mod): `https://act.diemoe.net/overlays/skyline/`

## Usage

Check [ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin). For WebSocket mode, note that `backdrop-filter` support needs to be enabled manually on Firefox, check [Can I use](https://caniuse.com/css-backdrop-filter) for more details.

2K+ (WQHD+) screen with 1.1x scale is recommended for better experience in FFXIV.

By default the overlay follows the pet-merging policy set in the FFXIV ACT Plugin. When playing on global servers with a custom language patch which causes the plugin's pet-merging not working, you can set your ID in an overlay config to manually merge your pets' data.

Local server:

```bash
git clone https://github.com/dsrkafuu/skyline-overlay.git
cd skyline-overlay
npm i -g pnpm
pnpm install
pnpm run build
pnpm start
```

You can use [CSSNANO](https://cssnano.co/playground/) to minify your CSS into single line.

<!-- ## Support

Some of my projects is using the CDN provided by jsDelivr whose ICP license was unexpectedly lost in 2021-12, which **may** causes slow connections in mainland China. Replacing the CDN will not be considered since it **works well in other regions** and its the best free CDN I've ever used. Ref: <https://github.com/jsdelivr/jsdelivr/issues/18348#issuecomment-997777996>. -->

## Environment

```
VITE_BASE_URL="/"    # dist base url (optional)
VITE_GA_ID=""         # google analytics id
VITE_SENTRY_DSN=""    # sentry dsn for error tracking & perfromance measuring (optional)
```

## Contribute

Clone this repo, install packages and run the development server:

```bash
git clone https://github.com/dsrkafuu/skyline-overlay.git
cd skyline-overlay
npm i -g pnpm
pnpm install
pnpm run dev
```

### Add Translations

Please use [ISO 639-1:2002](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) defined 2-letter code as filename, use `ja` as an example:

1. Create a new `ja.json` file in `@/src/lang`, use `en.json` as a template
2. Import `ja.json` in `@/src/lang/index.js`
3. Add a new lang in `@/src/lang/index.js` exported map, like `ja: { translation: ja },`

### Add Custom Themes

1. Create a new `your-theme-filename.scss` file in `@/src/themes`, use `default.scss` and `ikegami.scss` as examples
2. Import `your-theme-filename.scss` in `@/src/themes/index.js`
3. Add a new theme in `@/src/themes/index.js` exported map, like `'your-theme-filename': { text: 'The New Theme' }`

#### Customizable Colors

If you'd like to add colors to your theme that users can customize, add a "colors" key to your theme object in `@/src/themes/index.js`.

```
myTheme: { 
  text: 'My Theme', 
  colors: { 
    'background': {r: 0, g: 0, b: 0, a: 0.3},
    'text-color': {r: 255, g: 255, b: 255, a: 1},
    'accent-color': {r: 0, g: 60, b: 160, a: 0.3},
  }
},
```

These variables will now be accessible within your `.scss` file as `var(--color-theme-X)`, where `X` is the color key name. (Example: `var(--color-theme-accent-color)`)
The colors set within the theme file will be the default colors.

### Contributors

[@DieMoe233](https://github.com/DieMoe233)
[@Slightlyxz](https://github.com/Slightlyxz)
[@j0sh77](https://github.com/j0sh77)

## Credits

- jsDelivr: <https://www.jsdelivr.com>
- ffxiv-overlay-api: <https://github.com/dsrkafuu/ffxiv-overlay-api>
- Job Icons: <https://github.com/xivapi/classjob-icons/tree/master/svg>
- MiSans: <https://home.miui.com>

## LICENSE

Released under `Apache License 2.0`, for more information read the [LICENSE](https://github.com/dsrkafuu/skyline-overlay/blob/main/LICENSE).

**Copyright © 2020-present DSRKafuU (<https://dsrkafuu.net>)**
