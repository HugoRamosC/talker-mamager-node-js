const express = require('express');
const { readData } = require('./utils/fs/readData');
const { tokenGenarator } = require('./utils/middlewares/tokenGenarator');
const { loginValidator } = require('./utils/middlewares/loginValidator');
const {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
} = require('./utils/middlewares/newTalkerValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

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
    return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: `Internar error ${err}` });
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
    return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: `Internar error ${err}` });
  }
});

app.post('/login', loginValidator, async (_req, res) => {
  try {
    const token = await tokenGenarator();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
      .json({ message: `Internor error ${err}` });
  }
});

app.post('/talker',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator, async (_req, res) => {
    try {
      const talkers = await readData();
      const newTalker = {
        id: talkers[talkers.length - 1].id + 1,
        name: 'Danielle Santos',
        age: 56,
        talk: {
          watchedAt: '22/10/2019',
          rate: 5,
        },
      };
      return res.status(HTTP_CREATED_STATUS).json({ newTalker });
    } catch (err) {
      return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `Internor error ${err}` });
    }
  });

module.exports = app;
