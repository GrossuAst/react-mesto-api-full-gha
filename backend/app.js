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
  origin: 'http://localhost:3000',
  credentials: true,
}));

// импорт логгеров
// eslint-disable-next-line no-unused-vars
const { requestLogger, errorLogger } = require('./middlewares/logger');

// импорт роутов
const nonExistenRoutes = require('./routes/nonExistenRoutes');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

// мидлвэры
const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 4000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

// подключение логгера запросов
app.use(requestLogger);

app.use(registerRouter);
app.use(loginRouter);
app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);
app.use(nonExistenRoutes);

// логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {});
