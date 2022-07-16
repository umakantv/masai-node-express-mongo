const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,

    user: {  // normalized approach of defining relationship
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

    post: { // embedding approach between comment and post
        title: String,
        id: mongoose.Types.ObjectId
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;