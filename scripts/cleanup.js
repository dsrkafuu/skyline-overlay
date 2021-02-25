/**
 * [NOTE]
 *
 * the `@svgr/rollup` handles all svg import,
 * which vite still output `.svg` files into `dist/assets`
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const svgs = glob.sync('dist/assets/*.svg');
svgs.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  fs.rmSync(p, { force: true });
});
