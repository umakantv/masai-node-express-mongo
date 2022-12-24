
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: String,
    author: {
        _id: mongoose.Types.ObjectId,
        name: String,
        image: String,
    },
    post: {
        _id: mongoose.Types.ObjectId,
        title: String,
    }
}, {
    timestamps: true
})

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
    CommentModel
}