const express = require('express');
const { readData } = require('./utils/fs/readData');
const { tokenGenarator } = require('./utils/tokenGenarator');
const { loginValidator } = require('./utils/middlewares/loginValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
const HTTP_BADREQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_NOT_FOUND_STATUS = 404;
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
    const talkers = await readData();
    if (!talkers) return res.status(HTTP_NOT_FOUND_STATUS).send([]);
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    return res.status(500).json({ message: `Internar error ${err}` });
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readData();
    const talkerFound = talkers.find((t) => +t.id === +id);
    if (!talkerFound) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(HTTP_OK_STATUS).json(talkerFound);
  } catch (err) {
    return res.status(500).json({ message: `Internar error ${err}` });
  }
});

app.post('/login', loginValidator, async (req, res) => {
  try {
    const token = await tokenGenarator();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    return res.status(500).json({ message: `Internor error ${err}` });
  }
});

app.post('/talker', loginValidator, async (req, res) => {
  try {
    const { token } = req.headers;
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    if (!token) return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
    if (token.length !== 16) return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
    if (!name) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    if (!age) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
    if (typeof(age) !== 'number') return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "age" deve ser do tipo "number"' });
    if (!Number.isInteger(age)) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    if (age < 18) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    if (!talk) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "talk" é obrigatório' });
    if (!watchedAt) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "watchedAt" é obrigatório' });
    if (!watchedAt) return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });

  } catch (err) {
    return res.status(500).json({ message: `Internor error ${err}` });
  }
});

module.exports = app;
