const Post = require('../database/post')
const Comment = require('../database/comment')

async function getAllCommentsForUser(req, res, next) {
    const {skip, limit} = req.query;
    const {userId} = req.params;

    const comments = await Comment.find({
        user: userId
    }).skip(skip).limit(limit);

    return res.send({
        data: comments
    })
}

async function createComment(req, res, next) {
    let { comment } = req.body;
    const { user } = req.context

    comment.user = user.id;

    const post = await Post.findById(comment.post);

    if (post) {
        comment.post = {
            title: post.title,
            id: post.id.toString()
        }
    } else {
        return res.send({
            error: "Post does not exist."
        })
    }

    comment = await Comment.create(comment);

    return res.send({
        data: comment
    })
}

async function updateComment(req, res, next) {
    let {id} = req.params;
    let {comment: commentData} = req.body;

    let comment = await Comment.findById(id);

    if (comment) {
        if (!checkCommentBelongsToUser(comment, user)) {
            return res.status(401).send({
                error: "This comment does not belong to you. You can't delete it."
            })
        }
    } else {
        return res.status(404).send({
            error: "Comment with given id does not exist."
        })
    }

    for (const [key, value] of Object.entries(commentData)) {
        comment[key] = value;
    }

    await comment.save();

    return res.send({
        data: comment
    })
}

function checkCommentBelongsToUser(comment, user) {

    if (comment.user.toString() === user._id.toString()) {
        return true
    }

    return false;
}

async function deleteComment(req, res, next) {
    let {id} = req.params;
    const { user } = req.context

    const comment = await Comment.findById(id)

    if (comment) {
        if (!checkCommentBelongsToUser(comment, user)) {
            return res.status(401).send({
                error: "This comment does not belong to you. You can't delete it."
            })
        }
    } else {
        return res.status(404).send({
            error: "Comment with given id does not exist."
        })
    }

    await Comment.findByIdAndDelete(id);

    return res.send({
        message: "Comment has been deleted."
    })

}

module.exports = {
    getAllCommentsForUser,
    createComment,
    updateComment,
    deleteComment,
}