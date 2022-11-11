import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minLength: 50
    },
    author: {
        authorId: String,
        authorName: String,
        authorImage: String,
    }
})

const blogModel = mongoose.model('blogs', blogSchema) // blogs

export default blogModel;