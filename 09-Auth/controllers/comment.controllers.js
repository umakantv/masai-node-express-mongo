import CommentModel from "../db/Comment.model.js";

export async function addComment(comment, user) {
    let addedComment = await CommentModel.create({
        comment: comment.comment,
        postId: comment.postId,
        author: {
            userId: user._id,
            name: user.name,
            iamge: user.image,
        }
    })

    return addedComment;
}

export async function getCommentsByPostId(postId) {
    return CommentModel.find({
        postId
    });
}