
const express = require('express');
const { createComment, getCommentsByBlogId, editComment, deleteComment } = require('../controllers/comment.controllers');

const commentRouter = express.Router()

commentRouter.get('/blog/:id', getCommentsByBlogId)
commentRouter.post('/', createComment)
commentRouter.patch('/:id', editComment)
commentRouter.delete('/:id', deleteComment)

module.exports = commentRouter;