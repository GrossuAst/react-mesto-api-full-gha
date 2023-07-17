const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const secretKey = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    // throw new UnauthorizedError('Необходима авторизация');
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
