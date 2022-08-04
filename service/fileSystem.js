const fs = require('fs').promises;

async function readFile() {
  const file = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(file);
}

async function writeFile(newFile) {
  const file = await fs.writeFile('./talker.json', JSON.stringify(newFile));
  return file;
}

module.exports = {
  readFile,
  writeFile,
};