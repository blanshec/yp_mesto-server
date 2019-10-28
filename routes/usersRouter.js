const usersRouter = require('express').Router();
const {
  getUsers, getUser, createUser, loginUser,
} = require('../controllers/usersController');

usersRouter.post('/signup', createUser);
usersRouter.post('/signin', loginUser);

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);


module.exports = usersRouter;
