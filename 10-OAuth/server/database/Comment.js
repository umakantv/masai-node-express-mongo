
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    
    content: String,

    user: {
        userId: String,
        name: String,
        image: String,
    },

    post: {
        postId: String,
        title: String,
    }
    
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', CommentSchema) // collection - posts

module.exports = {
    Comment
}