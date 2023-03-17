/* eslint-disable quotes */
/* eslint-disable import/order */
const validator = require('validator');
const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, updateAvatar, updateProfile, getСurrentUser,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/me', getСurrentUser);
routerUser.get('/:userId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom((value, helper) => (validator(value) ? value : helper.message({ custom: "Некорректный Id" }))),
  }),
}), getUserId);
routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
routerUser.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/w*[-._~:/?#[\]@!$&'()*+,;=0-9a-z]+#?/i),
  }),
}), updateAvatar);

module.exports = { routerUser };
