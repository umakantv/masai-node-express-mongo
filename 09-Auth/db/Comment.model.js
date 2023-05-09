import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
    comment: String,
    author: { // denormalized approach
        userId: String,
        name: String,
        image: String,
    },
    postId: String, // normalized approach
}, {
    timestamps: true,
})

const CommentModel = model('Comment', CommentSchema, 'comments')

export default CommentModel;

async function getAllCommentsByPostId(postId) {
    let comments = await CommentModel.find({
        postId
    })

    return comments;
}