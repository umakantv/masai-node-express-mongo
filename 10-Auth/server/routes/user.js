const express = require('express');
const { getAllUsers, register, login, getLoggedInUser, googleSignin } = require('../handlers/user');
const auth = require('./middlewares/auth');

const userRouter = express.Router()

userRouter.post('/users/register', register);
userRouter.post('/users/login', login);
userRouter.get('/users/getLoggedIn', auth, getLoggedInUser);

userRouter.post('/users/googleSignin', googleSignin);

userRouter.get('/users', getAllUsers);

module.exports = userRouter;