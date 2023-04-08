
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 10,
    },
    user: {
        userId: String,
        name: String,
        image: String
    },
    post: {
        postId: String,
        title: String
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema) // comments collection

module.exports = Comment