const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Error500 = require('../errors/500-err');
const NotFoundError = require('../errors/not-found-err');

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.status(400).send({ message: 'Empty request body' });

  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      email: user.email,
    }))
    .catch(() => {
      const err = new Error('Error creating a user');
      err.statusCode = 400;
      next(err);
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCreds(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });

      res.status(201).cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: 'User logged in' });
    })
    .catch((e) => {
      const err = new Error(e.message);
      err.statusCode = 401;
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new Error500('An error occured while reading user list')));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw Error;
      res.send({ data: user });
    })
    .catch(() => next(new NotFoundError('User with this id does not exist')));
};
