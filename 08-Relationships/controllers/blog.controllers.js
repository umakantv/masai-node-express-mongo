const blogModel = require("../database/blog.model")

async function getBlogsByUserId(req, res) {

    const {userId} = req.params;

    const blogs = await blogModel.find({
        'author.authorId': userId,
    }).sort({
        createdAt: -1
    })

    return res.send({
        status: 'success',
        data: blogs
    })
}

async function createBlogPost(req, res) {

    const blog = req.body;

    // check if the user already created a blog post

    if (!blog.author) {
        throw new Error('No author details provided')
    }

    const blogData = await blogModel.create(blog);

    return res.send({
        status: 'success',
        data: blogData
    })

}

module.exports = {
    getBlogsByUserId,
    createBlogPost,
}