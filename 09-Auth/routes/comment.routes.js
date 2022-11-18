
const express = require('express');
const { createComment, getCommentsByBlogId } = require('../controllers/comment.controllers');

const commentRouter = express.Router()

commentRouter.get('/blog/:id', getCommentsByBlogId)
commentRouter.post('/', createComment)

module.exports = commentRouter;