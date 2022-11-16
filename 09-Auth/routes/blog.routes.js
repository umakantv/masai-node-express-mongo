
const express = require('express');
const { getBlogsByUserId, createBlogPost } = require('../controllers/blog.controllers');

const blogRouter = express.Router()

blogRouter.get('/user/:userId', getBlogsByUserId)
blogRouter.post('/', createBlogPost)

module.exports = blogRouter;