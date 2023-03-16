/* eslint-disable import/order */
const routerUser = require('express').Router();
const {
  getUsers, getUserId, updateAvatar, updateProfile, getСurrentUser,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUserId);
routerUser.get('/me', getСurrentUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = { routerUser };
