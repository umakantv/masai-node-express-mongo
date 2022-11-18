
const express = require('express');
const { getBlogsByUserId, createBlogPost, getBlogsPaginated, getBlogById } = require('../controllers/blog.controllers');

const blogRouter = express.Router()

blogRouter.post('/', createBlogPost)

blogRouter.get('/user/:userId', getBlogsByUserId)
blogRouter.get('/:id', getBlogById)
blogRouter.get('/', getBlogsPaginated)

module.exports = blogRouter;