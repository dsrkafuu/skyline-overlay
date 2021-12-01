/**
 * remove redundant svg files in vite's output folder
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

console.log(chalk.blue('removing redundant svg files...'));

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
function deleteFile(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.unlinkSync(path);
    } catch (e) {
      reject(e);
    }
  });
}

const workers = [];
const svgs = glob.sync('dist/assets/*.svg');
svgs.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  workers.push(deleteFile(p));
});

Promise.all(workers)
  .then(() => {
    console.log(chalk.green(`removed ${svgs.length} svg files`));
  })
  .catch((e) => {
    console.log(chalk.red('failed to remove some of svg files'));
    console.error(e);
    process.exitCode = 1;
  });
