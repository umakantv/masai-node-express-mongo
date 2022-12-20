
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    titleImage: String,
    author: {
        _id: mongoose.Types.ObjectId,
        name: String,
        image: String,
    }

    // Ref approach
    // author: { 
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // }
}, {
    timestamps: true
})

const PostModel = mongoose.model('Post', PostSchema);

module.exports = {
    PostModel
}