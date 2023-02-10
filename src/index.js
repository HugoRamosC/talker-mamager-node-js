const express = require('express');
const routers = require('./routers/index');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
app.use(routers);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(errorMiddleware);

module.exports = app;
