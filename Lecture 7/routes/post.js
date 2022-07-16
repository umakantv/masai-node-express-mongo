const express = require('express');
const { getAllPosts, getSinglePost, createPost, updatePost, deletePost } = require('../handlers/post');

const postRouter = express.Router()

postRouter.get('/posts/all', getAllPosts);
postRouter.get('/posts/:id', getSinglePost);
postRouter.post('/posts', createPost);
postRouter.patch('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

module.exports = postRouter;