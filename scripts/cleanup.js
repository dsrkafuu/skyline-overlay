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

async function main() {
  const workers = [];
  const svgs = glob.sync('dist/assets/*.svg');
  svgs.forEach((val) => {
    const p = path.resolve(__dirname, '../', val);
    workers.push(fs.rm(p, { force: true }));
  });
  await Promise.all(workers);
  return { files: svgs.length };
}

console.log(chalk.blue('cleaning up redudant svg files...'));
main()
  .then(({ files }) => {
    console.log(chalk.green(`redudant ${files} svg files removed`));
  })
  .catch((e) => {
    console.log(chalk.red('failed to remove some of svg files'));
    console.error(e);
    process.exitCode = 1;
  });
