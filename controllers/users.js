/* eslint-disable max-len */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};
