const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {  // normalized approach of defining relationship
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;