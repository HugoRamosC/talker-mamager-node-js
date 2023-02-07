const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../../talker.json');

const readData = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido ${error}`);
  }
};

module.exports = { readData };
