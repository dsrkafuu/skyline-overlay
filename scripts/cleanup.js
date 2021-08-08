/**
 * [NOTE]
 *
 * the `@svgr/rollup` handles all svg import,
 * which vite still output `.svg` files into `dist/assets`
 */

const fs = require('fs/promises');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

console.log(chalk.blue('cleaning up redudant svg files...'));

const workers = [];
const svgs = glob.sync('dist/assets/*.svg');
svgs.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  workers.push(fs.rm(p, { force: true }));
});

Promise.all(workers)
  .then(() => {
    console.log(chalk.green(`redudant ${svgs.length} svg files removed`));
  })
  .catch((e) => {
    console.log(chalk.red('failed to remove some of svg files'));
    console.error(e);
    process.exitCode = 1;
  });
