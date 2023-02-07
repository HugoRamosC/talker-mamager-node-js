const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const talkerPath = path.resolve(__dirname, './talker.json');

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
// const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

const readFile = async () => {
  try {
    const data = await fs.readFile(talkerPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido ${error}`);
  }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talkers = await readFile();
    if (!talkers) return res.status(404).send([]);
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    return res.status(500).json({ message: `Internar error ${err}` });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readFile();
    const talkerFound = talkers.find((t) => +t.id === +id);
    if (!talkerFound) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(HTTP_OK_STATUS).json(talkerFound);
  } catch (err) {
    return res.status(500).json({ message: `Internar error ${err}` });
  }
});

module.exports = app;
