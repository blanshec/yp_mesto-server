require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { celebrate, Joi, errors } = require('celebrate');

const { usersRouter, cardsRouter } = require('./routes/index.js');
const { createUser, loginUser } = require('./controllers/usersController');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().uri().required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), loginUser);

app.use('/users', auth, usersRouter);

app.use('/cards', auth, cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Not found'));
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res) => {
  res.status(err.statusCode ? err.statusCode : 500)
    .send({ message: err.message });
});


app.listen(PORT, () => { });
