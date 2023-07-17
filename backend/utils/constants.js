const defaultMessage = { message: 'На сервере произошла ошибка' };
const notFoundMessage = { message: 'Такого адреса не существует' };
const statusOk = 200;
const statusCreated = 201;
const defaultErrorStatus = 500;
const badRequestStatus = 400;
const notFoundStatus = 404;
const secretKey = 'A9nhY6gJ0BTpWdiEiRrLrRvJ0OFj44BrmwwiqWXjrE3JFkTS5jy8tLYfenS2aODNWEGlB6SGOukIGXRuqVr6Js2tpeA9HpZLuOMfRKZEQVu8hy';

module.exports = {
  secretKey,
  defaultMessage,
  notFoundMessage,
  statusOk,
  statusCreated,
  defaultErrorStatus,
  badRequestStatus,
  notFoundStatus,
};
