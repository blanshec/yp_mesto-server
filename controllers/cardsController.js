const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) return Promise.reject(new Error('Card does not exist'));
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) return Promise.reject(new Error('You cant delete the card that you didnt create'));
      Card.remove(card)
        .then((cardToDelete) => res.send(cardToDelete !== null ? { data: card } : { data: 'Nothing to delete' }))
        .catch(() => res.status(500).send({ message: 'An error occured' }));
    })
    .catch(() => res.status(500).send({ message: 'An error occured' }));
};
