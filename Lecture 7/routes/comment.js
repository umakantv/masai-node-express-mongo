const express = require('express');
const { getAllCommentsForUser, createComment, updateComment, deleteComment } = require('../handlers/comment');
const auth = require('./middlewares/auth');

const commentRouter = express.Router()

commentRouter.get('/comments/all', getAllCommentsForUser);
commentRouter.post('/comments', auth, createComment);
commentRouter.patch('/comments/:id', auth, updateComment);
commentRouter.delete('/comments/:id', auth, deleteComment);

module.exports = commentRouter;