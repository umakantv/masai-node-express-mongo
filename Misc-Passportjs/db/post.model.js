
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: 40,
    },
    author: {
        userId: String,
        name: String,
        image: String
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema) // posts collection

module.exports = Post