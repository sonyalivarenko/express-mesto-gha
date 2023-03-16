/* eslint-disable import/order */
const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, updateAvatar, updateProfile, getСurrentUser,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUserId);
routerUser.get('/me', getСurrentUser);
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
