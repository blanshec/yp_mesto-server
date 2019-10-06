const usersRouter = require('express').Router();
const { getUsers, getUser, createUser } = require('../controllers/usersController');

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);


module.exports = usersRouter;
