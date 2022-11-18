const commentsModel = require("../database/comment.model");

async function getBlogComments(blogId) {
    return commentsModel.find({
        blogId
    }).sort({
        createdAt: -1
    })
}

async function getCommentsByBlogId(req, res) {
    const {id} = req.params;

    const comments = await getBlogComments(id);

    return res.send({
        status: 'success',
        data: comments
    })
}

async function createComment(req, res) {

    const comment = req.body;
    const {user} = req;

    if (!user) {
        return res.status(400).send({
            status: 'error',
            message: 'User not logged in'
        })
    }

    comment.author = {
        _id: user._id,
        name: user.name,
        image: user.image,
    }

    if (!comment.blogId) {
        throw new Error('Blog id is not provided');
    }
    const commentData = await commentsModel.create(comment);

    return res.send({
        status: 'success',
        data: commentData
    })
}

module.exports = {
    getBlogComments,
    createComment,
    getCommentsByBlogId,
}