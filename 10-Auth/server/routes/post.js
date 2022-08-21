const express = require('express');
const { getAllPosts, getSinglePost, createPost, updatePost, deletePost } = require('../handlers/post');
const auth = require('./middlewares/auth');

const postRouter = express.Router()

postRouter.get('/posts/all', getAllPosts);
postRouter.get('/posts/:id', getSinglePost);
postRouter.post('/posts', auth, createPost);
postRouter.patch('/posts/:id', auth, updatePost);
postRouter.delete('/posts/:id', auth, deletePost);

module.exports = postRouter;