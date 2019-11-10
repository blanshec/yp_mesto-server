const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard,
} = require('../controllers/cardsController');

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
}), createCard);

cardsRouter.get('/', getCards);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), deleteCard);

module.exports = cardsRouter;
