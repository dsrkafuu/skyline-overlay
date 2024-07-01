/**
 * update build metadata
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prettier = require('prettier');

const prettierOptions = require('../.prettierrc');

const main = async () => {
  try {
    console.log(chalk.blue('generating build metadata in `meta.ts`...'));

    const filePath = path.resolve(__dirname, '../src/assets/meta.ts');
    const pkgPath = path.resolve(__dirname, '../package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));
    const lines = [];
    lines.push(`// code generated by \`script:genMeta\` - DO NOT EDIT`);

    lines.push(`export const version = 'v${pkg.version}';`);
    lines.push(`export const versionCode = '${pkg.versionCode}';`);
    lines.push(`export const date = ${Date.now()};`);
    const code = await prettier.format(lines.join('\n') + '\n', {
      parser: 'typescript',
      ...prettierOptions,
    });
    fs.writeFileSync(filePath, code, { encoding: 'utf-8' });
    console.log(chalk.green(`build metadata generated`));
    process.exitCode = 0;
  } catch (e) {
    console.log(chalk.red('failed to generate build metadata'));
    console.error(e);
    process.exitCode = 1;
  }
};

main();
