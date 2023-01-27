
const express = require('express');
const { createPost, getBlogs, getBlogById } = require('../controllers/post');
const authMiddleware = require('../middlewares/auth');

const postRouter = express.Router();

postRouter.post('/', authMiddleware, createPost)
postRouter.get('/', getBlogs)
postRouter.get('/:id', getBlogById)

module.exports = postRouter;