
const express = require('express');
const { getCommentsByPostId, addCommentForPost } = require('../controllers/comment');
const authMiddleware = require('../middlewares/auth');

const commentRouter = express.Router();

commentRouter.post('/', authMiddleware, addCommentForPost);
commentRouter.get('/post/:postId', getCommentsByPostId)

module.exports = commentRouter;