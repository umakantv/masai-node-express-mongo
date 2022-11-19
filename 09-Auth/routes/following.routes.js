
const express = require('express');
const { unfollow, follow, following, followers } = require('../controllers/follower.controllers');

const followerRouter = express.Router()

followerRouter.get('/followers/:userId', followers)
followerRouter.get('/following/:userId', following)

// loggedin user actions
followerRouter.post('/:followingId', follow)
followerRouter.delete('/:followingId', unfollow)

module.exports = followerRouter;