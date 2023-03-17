/* eslint-disable linebreak-style */
const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), deleteCard);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
routerCard.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), likeCard);
routerCard.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
}), dislikeCard);

module.exports = { routerCard };
