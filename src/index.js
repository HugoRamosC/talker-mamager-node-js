const express = require('express');
const cryptoRandomString = require('crypto-random-string');
const { readFile } = require('./utils/fs/readData');

const app = express();
app.use(express.json());

const token = cryptoRandomString({ length: 16 });

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNAUTHORIZED_STATUS = 401;
// const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

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

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(HTTP_UNAUTHORIZED_STATUS)
        .json({ message: 'Acesso não autorizado. Verifique suas credenciais' });
    }
    return res.status(HTTP_CREATED_STATUS).json(token);
  } catch (err) {
    return res.status(500).json({ message: `Internar error ${err}` });
  }
});

module.exports = app;
