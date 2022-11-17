
const express = require('express')
const { fetchUser, login, register, getLoggedInUser, githubSignin } = require('../controllers/user.controllers')

const userRouter = express.Router()

userRouter.get('/loggedInUser', getLoggedInUser)
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/githubSignin', githubSignin)

userRouter.get('/:id', fetchUser)

module.exports = userRouter;