const express = require('express');
const { tokenGenarator } = require('../utils/middlewares/tokenGenarator');
const { loginValidator } = require('../utils/middlewares/loginValidator');

const loginRouter = express();
loginRouter.use(express.json());

const HTTP_OK_STATUS = 200;
// const HTTP_INTERNAL_SERVER_ERROR_STATUS = 500;

loginRouter.post('/login', loginValidator, async (_req, res, next) => {
  try {
    const token = await tokenGenarator();
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    next(err);
    // return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS)
    //   .json({ message: `Internor error ${err}` });
  }
});

module.exports = loginRouter;
