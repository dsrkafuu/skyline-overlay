/**
 * update build metadata
 */

import fs from 'fs';
import path from 'path';
import url from 'url';
import chalk from 'chalk';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

console.log(chalk.blue('updating build metadata in `meta.ts`...'));

try {
  const filePath = path.resolve(__dirname, '../src/assets/meta.ts');
  const pkgPath = path.resolve(__dirname, '../package.json');
  let code = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

  code = code.replace(
    /version = 'v\d+\.\d+\.\d+'/,
    `version = 'v${pkg.version}'`
  );
  code = code.replace(/date = \d+/, `date = ${Date.now()}`);

  fs.writeFileSync(filePath, code, { encoding: 'utf-8' });

  console.log(chalk.green(`build metadata updated`));
} catch (e) {
  console.log(chalk.red('failed to update build metadata'));
  console.error(e);
  process.exitCode = 1;
}
