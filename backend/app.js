const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');

// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

app.use(cors({
  origin: 'http://grossuast.mesto.nomoredomains.xyz',
  credentials: true,
}));

// импорт логгеров
// eslint-disable-next-line no-unused-vars
const { requestLogger, errorLogger } = require('./middlewares/logger');

// импорт роутов
const nonExistenRoutes = require('./routes/nonExistenRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

// мидлвэры
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

const {
  PORT = 3000,
  // MONGO_URL = 'mongodb://127.0.0.1',
} = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cookieParser());

// подключение логгера запросов
app.use(requestLogger);

app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', auth);
app.use('/api', userRoutes);
app.use('/api', cardRoutes);
app.use('/api', logoutRouter);
app.use(nonExistenRoutes);

// логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {});
