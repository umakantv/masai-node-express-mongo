const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 10
    },
    author: { // user has many blogs
        authorId: String,
        authorName: String,
        authorImage: String,
    }
}, {
    timestamps: true
    // createdAt
    // updatedAt
})

const blogModel = mongoose.model('blogs', blogSchema) // blogs

module.exports = blogModel;