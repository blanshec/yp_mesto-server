const cardsRouter = require('express').Router();
const { getCards, deleteCard, createCard } = require('../controllers/cardsController');

cardsRouter.post('/', createCard);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
