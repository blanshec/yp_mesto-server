const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { usersRouter, cardsRouter } = require('./routes/index.js');
const auth = require('./middlewares/auth');


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

app.use('/users', auth, usersRouter);

app.use('/cards', auth, cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => { });
