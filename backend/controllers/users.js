/* eslint-disable object-curly-newline */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV = 'production', JWT_SECRET = 'ddfc736b97c0621a857e150566eb985c' } = process.env;

const User = require('../models/user');

const {
  statusOk,
  statusCreated,
} = require('../utils/constants');

const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');

// получение всех пользователей
const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(statusOk).send(users))
    .catch(next);
};

// получение пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    // .then((user) => res.send({ data: user }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.status(statusOk).send({ data: user });
    })
    .catch(next);
};

// информация о текущем пользователе
const getInfoAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.status(statusOk).send({ data: user });
    })
    .catch(next);
};

// регистрация пользователя
const addNewUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((newUser) => {
          res.status(statusCreated).send({ data: newUser });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Такой пользователь уже существует'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(statusOk).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

// обновление данных профиля
const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    // данные для обновления
    { name: req.body.name, about: req.body.about },
    // опции
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(statusOk).send({ data: user }))
    .catch(next);
};

// обновление аватарки
const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(statusOk).send({ data: user }))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserById,
  getInfoAboutMe,
  addNewUser,
  login,
  updateProfile,
  updateAvatar,
};
