const usersRouter = require('express').Router();
const {
  getUsers, getUser,
} = require('../controllers/usersController');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);


module.exports = usersRouter;
