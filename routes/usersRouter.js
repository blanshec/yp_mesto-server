/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/', (req, res) => {
  res.send(users);
});

usersRouter.get('/:id', (req, res) => {
  const userIndex = users.findIndex((item) => item._id === req.params.id);
  if (userIndex < 0) {
    res.status(404).send({ mesage: 'Нет пользователя с таким id' });
  } else {
    res.send(users[userIndex]);
  }
});

module.exports = usersRouter;
