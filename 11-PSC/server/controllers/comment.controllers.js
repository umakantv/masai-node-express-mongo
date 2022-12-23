const { CommentModel } = require("../db/comment");
const { PostModel } = require("../db/post");
const { UserModel } = require("../db/user");


async function getCommentsByPostId(postId) {
    const comments = await CommentModel.find({
        'post._id': postId
    }).sort({
        createdAt: -1,
    })

    return comments;
}


async function addComment(userId, postId, commentData) {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new Error('User does not exist')
    }

    const post = await PostModel.findById(postId);

    if (!post) {
        throw new Error('Post does not exist')
    }

    const comment = await CommentModel.create({
        ...commentData,
        author: {
            _id: user._id,
            name: user.name,
            image: user.image
        },
        post: {
            _id: post._id,
            title: post.title
        }
    });

    await post.update({
        $inc: {
            commentCount: 1,
        } 
    })

    return comment;
}

module.exports = {
    addComment,
    getCommentsByPostId,
}