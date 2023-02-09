const express = require('express');
const { readData } = require('../utils/fs/readData');
const { writeData } = require('../utils/fs/writeData');
const {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
} = require('../utils/middlewares/talkerValidator');

const talkerRouter = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = { status: 404 };

talkerRouter.get('/talker', async (_req, res, next) => {
  try {
    const talkers = await readData();
    if (!talkers) return next({ ...HTTP_NOT_FOUND_STATUS, message: [] });
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    return next(err);
  }
});

talkerRouter.get('/talker/search', tokenValidator, async (req, res, next) => {
  try {
    const { q } = req.query;
    const talkers = await readData();
    const talkersFound = talkers.filter((t) => +t.name.includes(q));
    if (!q) return res.status(HTTP_OK_STATUS).json(talkers);
    return res.status(HTTP_OK_STATUS).json(talkersFound);
  } catch (err) {
    return next(err);
  }
});

talkerRouter.get('/talker/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = await readData();
    const talkerFound = talkers.find((t) => +t.id === +id);
    if (!talkerFound) {
      return next({ ...HTTP_NOT_FOUND_STATUS, message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(HTTP_OK_STATUS).json(talkerFound);
  } catch (err) {
    return next(err);
  }
});

talkerRouter.post('/talker',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator, async (req, res, next) => {
    try {
      const { name, age, talk: { watchedAt, rate } } = req.body;
      const talkers = await readData();
      const newTalker = {
        name,
        age,
        id: talkers[talkers.length - 1].id + 1,
        talk: { watchedAt, rate },
      };
      talkers.push(newTalker);
      await writeData(talkers);
      return res.status(HTTP_CREATED_STATUS).json(newTalker);
    } catch (err) {
      return next(err);
    }
  });

talkerRouter.put('/talker/:id',
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator, async (req, res, next) => {
    try {
      const { id } = req.params;
      const talkers = await readData();
      const talkerEdited = talkers.find((t) => +t.id === +id);
      const { name, age, talk: { watchedAt, rate } } = req.body;
      const newTalker = {
        name,
        age,
        id: talkerEdited.id,
        talk: { watchedAt, rate },
      };
      talkers.push(newTalker);
      await writeData(talkers);
      return res.status(HTTP_OK_STATUS).json(newTalker);
    } catch (err) {
      return next(err);
    }
  });

talkerRouter.delete('/talker/:id', tokenValidator, async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkers = await readData();
    const filtredTalkers = talkers.filter((t) => +t.id !== +id);
    await writeData(filtredTalkers);
    return res.status(HTTP_NO_CONTENT_STATUS).send();
  } catch (err) {
    return next(err);
  }
});

module.exports = talkerRouter;
