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
    const {user} = req;

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }

    blog.author = {
        _id: user._id,
        name: user.name,
        image: user.image,
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