const express = require('express');
const { getAllUsers, createUser } = require('../handlers/user');

const userRouter = express.Router()

userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser);

module.exports = userRouter;