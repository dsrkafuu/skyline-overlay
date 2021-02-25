/**
 * [NOTE]
 *
 * publish to china mainland gitee mirror
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// clean dest
const removes = glob.sync('.mirror/**/*', { dot: false });
removes.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  fs.rmSync(p, { force: true, recursive: true });
});

// copy to dest
const files = glob.sync('dist/**/*', { dot: true });
files.forEach((val) => {
  const p = path.resolve(__dirname, '../', val);
  const target = p.replace(/([/\\])dist([/\\]?)/i, '$1.mirror$2');
  if (fs.existsSync(p) && !fs.existsSync(target)) {
    if (fs.statSync(p).isDirectory()) {
      fs.mkdirSync(target, { recursive: true });
    } else {
      fs.copyFileSync(p, target);
    }
  }
});

// license and readme
const l = path.resolve(__dirname, '../LICENSE');
const lt = path.resolve(__dirname, '../.mirror/LICENSE');
fs.copyFileSync(l, lt);
const r = path.resolve(__dirname, '../README.md');
const rt = path.resolve(__dirname, '../.mirror/README.md');
fs.copyFileSync(r, rt);
