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
    author: {
        _id: String,
        name: String,
        image: String,
    },
}, {
    timestamps: true
})

const blogModel = mongoose.model('blogs', blogSchema) // blogs

module.exports = blogModel;