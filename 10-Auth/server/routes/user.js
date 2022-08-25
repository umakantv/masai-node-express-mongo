const express = require('express');
const { getAllUsers, register, login, getLoggedInUser } = require('../handlers/user');
const auth = require('./middlewares/auth');

const userRouter = express.Router()

userRouter.post('/users/register', register);
userRouter.post('/users/login', login);
userRouter.get('/googleSignin', getAllUsers);
userRouter.get('/users/getLoggedIn', auth, getLoggedInUser);

userRouter.get('/users', getAllUsers);

module.exports = userRouter;