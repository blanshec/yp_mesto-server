const usersRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/usersController');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);

usersRouter.post('/', createUser);

module.exports = usersRouter;
