const express = require('express');
const routers = require('./routers');
// const { readData } = require('./utils/fs/readData');
// const { writeData } = require('./utils/fs/writeData');
// const { tokenGenarator } = require('./utils/middlewares/tokenGenarator');
// const { loginValidator } = require('./utils/middlewares/loginValidator');
// const {
//   tokenValidator,
//   nameValidator,
//   ageValidator,
//   talkValidator,
//   watchedAtValidator,
//   rateValidator,
// } = require('./utils/middlewares/talkerValidator');

const app = express();
app.use(express.json());
app.use(routers);

const HTTP_OK_STATUS = 200;
// const HTTP_CREATED_STATUS = 201;
// const HTTP_NO_CONTENT_STATUS = 204;
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

// app.get('/talker', async (_req, res) => {
//   try {
//     const talkers = await readData();
//     if (!talkers) return res.status(HTTP_NOT_FOUND_STATUS).send([]);
//     return res.status(HTTP_OK_STATUS).json(talkers);
//   } catch (err) {
//     return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//       .json({ message: `Internar error ${err}` });
//   }
// });

// app.get('/talker/search', tokenValidator, async (req, res) => {
//   try {
//     const { q } = req.query;
//     const talkers = await readData();
//     const talkersFound = talkers.filter((t) => +t.name.includes(q));
//     if (!q) return res.status(HTTP_OK_STATUS).json(talkers);
//     return res.status(HTTP_OK_STATUS).json(talkersFound);
//   } catch (err) {
//     return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//       .json({ message: `Internar error ${err}` });
//   }
// });

// app.get('/talker/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const talkers = await readData();
//     const talkerFound = talkers.find((t) => +t.id === +id);
//     if (!talkerFound) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
//     return res.status(HTTP_OK_STATUS).json(talkerFound);
//   } catch (err) {
//     return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//       .json({ message: `Internar error ${err}` });
//   }
// });

// app.post('/login', loginValidator, async (_req, res) => {
//   try {
//     const token = await tokenGenarator();
//     return res.status(HTTP_OK_STATUS).json({ token });
//   } catch (err) {
//     return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//       .json({ message: `Internor error ${err}` });
//   }
// });

// app.post('/talker',
//   tokenValidator,
//   nameValidator,
//   ageValidator,
//   talkValidator,
//   watchedAtValidator,
//   rateValidator, async (req, res) => {
//     try {
//       const { name, age, talk: { watchedAt, rate } } = req.body;
//       const talkers = await readData();
//       const newTalker = {
//         name,
//         age,
//         id: talkers[talkers.length - 1].id + 1,
//         talk: { watchedAt, rate },
//       };
//       talkers.push(newTalker);
//       await writeData(talkers);
//       return res.status(HTTP_CREATED_STATUS).json(newTalker);
//     } catch (err) {
//       return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//         .json({ message: `Internor error ${err}` });
//     }
//   });

// app.put('/talker/:id',
//   tokenValidator,
//   nameValidator,
//   ageValidator,
//   talkValidator,
//   watchedAtValidator,
//   rateValidator, async (req, res) => {
//     try {
//       const { id } = req.params;
//       const talkers = await readData();
//       const talkerEdited = talkers.find((t) => +t.id === +id);
//       const { name, age, talk: { watchedAt, rate } } = req.body;
//       const newTalker = {
//         name,
//         age,
//         id: talkerEdited.id,
//         talk: { watchedAt, rate },
//       };
//       talkers.push(newTalker);
//       await writeData(talkers);
//       return res.status(HTTP_OK_STATUS).json(newTalker);
//     } catch (err) {
//       return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//         .json({ message: `Internor error ${err}` });
//     }
//   });

// app.delete('/talker/:id', tokenValidator, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const talkers = await readData();
//     const filtredTalkers = talkers.filter((t) => +t.id !== +id);
//     await writeData(filtredTalkers);
//     return res.status(HTTP_NO_CONTENT_STATUS).send();
//   } catch (err) {
//     return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
//         .json({ message: `Internor error ${err}` });
//   }
// });

module.exports = app;
