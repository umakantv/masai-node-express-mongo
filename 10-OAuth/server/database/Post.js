
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { // soft relation
        userId: String,
        name: String,
        image: String,
    }

    // author: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }

    // commentCount: Number
}, {
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema) // collection - posts

module.exports = {
    Post
}