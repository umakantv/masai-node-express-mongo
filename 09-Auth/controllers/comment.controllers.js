const Comment = require("../db/comment.model");
const Post = require("../db/post.model");

async function getCommentsByPostId(postId) {
    const comments = await Comment.find({
        'post.postId': postId
    }).sort({
        createdAt: -1
    })

    return comments;
}

async function addCommentForPost({
    content, postId, user
}) {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error('Post does not exist');
    }

    const comment = await Comment.create({
        content,
        user: {
            userId: user._id,
            name: user.name,
            image: user.image,
        },
        post: {
            postId: post._id,
            title: post.title
        }
    })

    return comment;
}

module.exports = {
    getCommentsByPostId,
    addCommentForPost,
}