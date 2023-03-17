/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const validator = require('validator');
const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helper) => (validator(value) ? value : helper.message({ custom: "Некорректный Id" }))),
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
    cardId: Joi.string().custom((value, helper) => (validator(value) ? value : helper.message({ custom: "Некорректный Id" }))),
  }),
}), likeCard);
routerCard.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helper) => (validator(value) ? value : helper.message({ custom: "Некорректный Id" }))),
  }),
}), dislikeCard);

module.exports = { routerCard };
