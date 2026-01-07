/**
 * remove redundant files in vite's output folder
 */

import url from 'url';
import fs from 'fs';
import path from 'path';
import * as glob from 'glob';
import chalk from 'chalk';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.blue('removing redundant svg/image files...'));

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
function deleteFile(path) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(path)) return resolve();
      if (fs.statSync(path).isDirectory()) {
        fs.rmdirSync(path, { recursive: true });
        return resolve();
      } else {
        fs.unlinkSync(path);
        return resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
}

const workers = [];
const svgs = [
  // ...glob.sync('dist/assets/*.svg'),
  // ...glob.sync('dist/assets/*.jpg'),
  'dist/devbg/',
];
svgs.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  workers.push(deleteFile(p));
});

const minifyJson = glob.sync('dist/*.json');
minifyJson.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  const old = fs.readFileSync(p, { encoding: 'utf-8' });
  const json = JSON.parse(old);
  const newJson = JSON.stringify(json);
  fs.writeFileSync(p, newJson, { encoding: 'utf-8' });
});
console.log(chalk.green(`minified ${minifyJson.length} json files`));

Promise.all(workers)
  .then(() => {
    console.log(chalk.green(`removed ${svgs.length} svg/image files`));
  })
  .catch((e) => {
    console.log(chalk.red('failed to remove some of svg/image files'));
    console.error(e);
    process.exitCode = 1;
  });
