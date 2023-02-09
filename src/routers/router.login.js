const express = require('express');
const { tokenGenarator } = require('../utils/middlewares/tokenGenarator');
const { loginValidator } = require('../utils/middlewares/loginValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
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

module.exports = app;
