
const express = require('express')
const { fetchUser, addUser } = require('../controllers/user.controllers')

const userRouter = express.Router()

userRouter.get('/:id', fetchUser)
userRouter.post('/', addUser)

module.exports = userRouter;