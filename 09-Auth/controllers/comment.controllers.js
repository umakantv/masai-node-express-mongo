import CommentModel from "../db/Comment.model.js";

export async function addComment(postId, comment, user) {
    console.log("Loggedin User", user)
    let addedComment = await CommentModel.create({
        comment: comment,
        postId: postId,
        author: {
            userId: user._id,
            name: user.name,
            image: user.image,
        }
    })

    return addedComment;
}

export async function getCommentsByPostId(postId) {
    return CommentModel.find({
        postId
    }).sort({
        createdAt: -1
    });
}