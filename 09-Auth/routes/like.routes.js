
const express = require('express');
const { getAllLikes, like, removeLike } = require('../controllers/like.controllers');

const likeRouter = express.Router()

// GET /like/all?blogId=6377c41bb73b8f5c561f61f8
// GET /like/all?commentId=6377c41bb73b8f5c561f61f8
likeRouter.get('/all', getAllLikes)

// loggedin user actions

// POST /like?blogId=6377c41bb73b8f5c561f61f8
likeRouter.post('/', like)

// DELETE /like?commentId=6377c41bb73b8f5c561f61f8
likeRouter.delete('/', removeLike)

module.exports = likeRouter;