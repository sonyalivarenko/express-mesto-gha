/* eslint-disable import/no-import-module-exports */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if ((err instanceof mongoose.Error.ValidationError) || (err instanceof mongoose.Error.CastError)) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Карточка не найдена');
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

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Карточка не найдена');
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
