const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

// обработчик несуществующих адресов
// eslint-disable-next-line no-unused-vars
module.exports = router.use('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
  // eslint-disable-next-line no-useless-return
  return;
});
