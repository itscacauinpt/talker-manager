const fs = require('fs').promises;

async function readFile() {
  const file = await fs.readFile('./talker.json', 'utf8');
  return JSON.parse(file);
}

module.exports = {
  readFile,
};