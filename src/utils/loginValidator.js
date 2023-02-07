const emailValidator = require('email-validator');

// const HTTP_BADREQUEST_STATUS = 400;

const loginValidator = (email, password) => {
  // const { email, password } = req.body;
  let message = false;
  if (!email) {
    message = 'O campo "email" é obrigatório';
  } else if (!emailValidator.validate(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
  } else if (!password) {
    message = 'O campo "password" é obrigatório';
  } else if (password.length < 6) {
    message = 'O "password" deve ter pelo menos 6 caracteres';
  } 
  // res.status(HTTP_BADREQUEST_STATUS)
  //     .json({ message });
  return message;
  // next();
};

module.exports = { loginValidator };