const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser,
} = require('../controllers/usersController');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), getUser);


module.exports = usersRouter;
