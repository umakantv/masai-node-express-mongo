

const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 8,
    },
    user: {
        userId: String,
        name: String,
        image: String,
    },
    post: {
        postId: String,
        title: String
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
