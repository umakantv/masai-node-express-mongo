const mongoose = require("mongoose")

/**
 * A user can like a blog or a comment.
 * 
 * They can use any of the following reactions:
 * 👍, 🚀, 🥳, ♥️, 💩, 👏
 */
const likeSchema = new mongoose.Schema({
    likedBy: {
        _id: String,
        name: String,
        image: String,
    },
    blogId: String,
    commentId: String,
    reaction: String,
}, {
    timestamps: true
})

const likeModel = mongoose.model('likes', likeSchema)

module.exports = likeModel;