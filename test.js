const fs = require('fs/promises');
const path = require('path');

function test() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, './jsconfig.json'), { encoding: 'utf-8' })
      .then((content) => {
        JSON.parse('adawdawdw' + content);
      })
      .catch((e) => {
        console.log(111);
      });
  });
}

test().catch((e) => {
  console.log(111);
});
