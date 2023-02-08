const moment = require('moment');

const HTTP_BADREQUEST_STATUS = 400;
const HTTP_UNAUTHORIZED_STATUS = 401;

const tokenValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidator = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidator = async (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof (age) !== 'number') {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age < 18) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidator = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const watchedAtValidator = async (req, res, next) => {
  const { talk } = req.body;
  // console.log(moment(talk.watchedAt).format('DD/MM/YYYY'));
  console.log(moment(talk.watchedAt).format('DD/MM/YYYY'));
  if (!talk.watchedAt) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!moment(talk.watchedAt).format('DD/MM/YYYY')) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidator = async (req, res, next) => {
  const { talk } = req.body;
  const rateNumbers = [1, 2, 3, 4, 5];
  if (!talk.rate) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!rateNumbers.includes(talk.rate)) {
    return res.status(HTTP_BADREQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  tokenValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidator,
};