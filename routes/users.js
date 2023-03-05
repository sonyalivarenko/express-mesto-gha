/* eslint-disable import/order */
const routerUser = require('express').Router();
const {
  getUsers, getUserId, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUserId);
routerUser.post('/', createUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = { routerUser };
