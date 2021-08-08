/**
 * [NOTE]
 *
 * remove all source code content in sourcemaps
 * like webpack
 */

const fs = require('fs/promises');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

function removeContent(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' })
      .then((content) => {
        const sourcemap = JSON.parse(content);
        if (!sourcemap.sourcesContent) {
          resolve();
        }
        delete sourcemap.sourcesContent;
        fs.writeFile(path, JSON.stringify(sourcemap), { encoding: 'utf-8' })
          .then(() => {
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
}

async function main() {
  const workers = [];
  const sourcemaps = glob.sync('dist/assets/*.map');
  sourcemaps.forEach((val) => {
    const p = path.resolve(__dirname, '../', val);
    workers.push(removeContent(p));
  });
  await Promise.all(workers);
  return { files: sourcemaps.length };
}

console.log(chalk.blue('removing sourcemap source contents...'));
main()
  .then(({ files }) => {
    console.log(chalk.green(`source contents removed in ${files} sourcemaps`));
  })
  .catch((e) => {
    console.log(chalk.red('failed to process some of sourcemaps'));
    console.error(e);
    process.exitCode = 1;
  });
