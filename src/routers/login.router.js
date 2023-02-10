const express = require('express');
const { tokenGenarator } = require('../middlewares/tokenGenarator');
const { loginValidator } = require('../middlewares/loginValidator');

const loginRouter = express();
loginRouter.use(express.json());

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', loginValidator, async (_req, res, next) => {
  try {
    const token = await tokenGenarator();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
