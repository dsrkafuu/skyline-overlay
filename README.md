<h1 align="center">
  <img src="https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/main/public/favicon.svg" alt="Skyline Logo" width="128" /><br />
  Skyline Overlay
  <br />
</h1>

<h4 align="center">A modern customizable horizon FFXIV miniparse overlay.</h4>
<br />

![](https://img.shields.io/github/package-json/v/dsrkafuu/skyline-overlay)
![](https://img.shields.io/badge/ffxiv-dawntrail-orange)
[![](https://img.shields.io/github/license/dsrkafuu/skyline-overlay)](https://github.com/dsrkafuu/skyline-overlay/blob/main/LICENSE)

Features: Basic overlay, extended details, customizable display/data settings, battle history, custom colors, sw cache and more. The project is based on React 18, and the dedicated [ffxiv-overlay-api](https://github.com/dsrkafuu/ffxiv-overlay-api).

<img align="center" src="https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/refs/heads/main/assets/preview-zh-v4.png" alt="Skyline Preview" />

<img align="center" src="https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/refs/heads/main/assets/preview2-zh-v4.png" alt="Skyline Preview Duo" />

## Overlay Links

- CloudFlare (Global): `https://skyline.dsrkafuu.net/`
- Mirror (CN FFCafe): `https://overlays.ffcafe.cn/skyline/`
- Mirror (CN DieMoe): `https://overlay.diemoe.net/skyline/`

## Usage

Check [ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin). For WebSocket mode, note that `backdrop-filter` support needs to be enabled manually on Firefox, check [Can I use](https://caniuse.com/css-backdrop-filter) for more details.

2K+ (WQHD+) screen with 1.2+x scale is recommended for better experience in FFXIV.

Click the encounter can ends current battle and start a new one; zone name will be fully displayed when hover; click the DPS meter on encounter bar can switch to show HPS.

By default the overlay follows the pet-merging policy set in the FFXIV ACT Plugin. When playing on global servers with a custom language patch which causes the plugin's pet-merging not working, you can set your ID in an overlay config to manually merge your pets' data.

You can use [CSSNANO](https://cssnano.co/playground/) to minify your CSS into single line.

## Browsers Support

Supports major browser versions released at `baseline-widely-available`.

- Chrome: >=111
- Firefox: >=114
- Safari: >=16.4

## Cache Rules

The app uses Service Workers to cache all the assets, which makes it ready for offline usage after the first time.

When releasing a new version, you can wait for the pop-up notification to confirm the cache update, or use Ctrl+F5 to force refresh the app.

## Environment

```
VITE_BASE_URL="/"     # dist base url (optional)
VITE_GA_ID=""         # google analytics id
```

## Local Build

Install [Bun](https://bun.sh/) before running the following commands:

```bash
git clone https://github.com/dsrkafuu/skyline-overlay.git
cd skyline-overlay
bun install
bun run build
```

## Online Debug

![Debug URL Query](https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/main/assets/debug-1.png)

1. Add `debug=1` to the URL
2. Open the debug tool of ACT plugin
3. Reload the overlay in ACT plugin
4. Do somethings which will trigger the issue
5. Save the log and upload it like below

![Debug Log Save](https://raw.githubusercontent.com/dsrkafuu/skyline-overlay/main/assets/debug-2.png)

Theses also a `rawdata=1` query to get the raw data from ngld.

### Add Translations

Please use [ISO 639-1:2002](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) defined 2-letter code as filename, use `ja` as an example:

1. Create a new `ja.json` file in `@/src/lang`, use `en.json` as a template
2. Import `ja.json` in `@/src/lang/index.js`
3. Add a new lang in `@/src/lang/index.js` exported map, like `ja: { translation: ja },`

### Add Custom Themes

1. Add a new author in `@/src/themes/support/authors.ts`
2. Create `@/src/themes/<name>.ts` and `@/src/themes/<name>.scss`
3. Configure your theme in `@/src/themes/<name>.ts`
4. Write theme styles in `@/src/themes/<name>.scss`

#### Customizable Colors

All themes has pre-defined colors, check out `@/src/themes/default.ts` and `@/src/themes/horiz.scss` for examples.

If you'd like to add colors to your theme that users can customize, add a `theme` key to your colors object in `@/src/themes/<name>.ts`.

```ts
const myColors: Colors = {
  common: [0, 0, 0, 0.3],
  self: [118, 118, 118, 1],
  ...
  theme: {
    fg: [255, 255, 255],
    bg: [0, 0, 0, 0.3],
    bga: [85, 85, 85],
  },
};
```

These variables will now be accessible within your `.scss` file as `var(--color-theme-<key>)`, where `<key>` is the color key name.

### Contributors

[@DieMoe233](https://github.com/DieMoe233)
[@j0sh77](https://github.com/j0sh77)
[@Slightlyxz](https://github.com/Slightlyxz)
[@thewakingsands](https://github.com/thewakingsands)

## Credits

- ffxiv-overlay-api: <https://github.com/dsrkafuu/ffxiv-overlay-api>
- Job Icons: <https://github.com/xivapi/classjob-icons/tree/master/svg>
- jsDelivr: <https://www.jsdelivr.com>

## LICENSE

Released under `Apache License 2.0`, for more information read the [LICENSE](https://github.com/dsrkafuu/skyline-overlay/blob/main/LICENSE).

**Copyright © 2020-present DSRKafuU (<https://dsrkafuu.net>)**

## CHANGELOG

Only latest changes listed here, generated by GPT-5.3-Codex from latest commits.

> If this version has no issues, this will be the last release before 8.0.

- Reworked data lock behavior: lock now freezes displayed encounter/combatant data while real-time data keeps syncing in background
- Adjusted time button behavior: clicking time button ends current battle (force segment) and clears current data from overlay
- Unified history preview with lock flow: selecting history auto-locks snapshot; unlocking returns highlight to current row
- Improved encounter-end behavior: ending a battle no longer immediately inserts history; finished data stays on screen until next battle starts
- Removed `Big Number Mode` entirely (settings state/action, formatting path, UI toggle, and i18n entries)
- Performance and render optimizations from recent refactors (memoized heavy paths and reduced redundant re-renders)
- Hardened external `CombatData` normalization with runtime-safe parsing and fallback defaults for unstable upstream payloads
- Added top-level React Error Boundary with fallback UI and one-click overlay reload on render failures
- Kept `stablehash` dedupe while simplifying update flow by removing async `sha1` path to reduce maintenance and timing risks
- Updated callback-mode compatibility binding to upstream style (removed legacy `dispatchOverlayEvent` assignment)
- Replaced ESLint/Prettier with `oxlint`/`oxfmt` and re-fmted all the source code

仅列出最新更改，修改内容由 GPT-5.3-Codex 根据最新提交生成。

> 如果本版本没有问题，这将是 8.0 前的最后一个版本。

- 重构了数据锁定行为：锁定现在会冻结显示的战斗/成员数据，实时数据仍在后台同步
- 调整了时间按钮的行为：点击时间按钮会结束当前战斗（强制分段）并清除悬浮窗当前数据
- 历史预览与锁定流程统一：选择历史时自动锁定快照，解锁后高亮返回当前行
- 优化了战斗结束行为：结束战斗不再立即插入历史，已完成数据会保留在屏幕上直到下一场战斗开始
- 完全移除了“大数字模式”（设置状态/操作、格式化路径、UI 开关和 i18n 条目）
- 最近重构带来的性能和渲染优化（重用重计算路径，减少多余渲染）
- 加强了外部 `CombatData` 规范化，使用运行时安全解析和默认回退以应对不稳定的上游数据
- 新增顶层 React 错误边界，渲染失败时显示兜底 UI 并支持一键重载
- 保留 `stablehash` 去重，同时简化更新流程，移除异步 `sha1` 路径以降低维护和时序风险
- 回调模式兼容性绑定更新为上游风格（移除旧的 `dispatchOverlayEvent` 赋值）
- 用 `oxlint`/`oxfmt` 替换 ESLint/Prettier，并重新格式化了全部源码
