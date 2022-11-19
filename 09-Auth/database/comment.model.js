const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 10
    },
    author: {
        _id: String,
        name: String,
        image: String,
    },
    blogId: String,
    likeCount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

const commentsModel = mongoose.model('comments', commentSchema) // commentss

module.exports = commentsModel;