const fs = require('fs').promises;

async function readFile() {
  const file = await fs.readFile('./talker.js', 'utf8');
  return JSON.parse(file);
}

module.exports = {
  readFile,
};