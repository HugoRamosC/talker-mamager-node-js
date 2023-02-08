const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../../talker.json');

const writeData = async (data) => {
  try {
    await fs.writeFile(talkerPath, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log('Error on write file');
    console.error(`Arquivo não pôde ser lido ${err}`);
  }
};

module.exports = { writeData };
