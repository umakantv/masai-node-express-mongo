
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({ // Class
    title: String,
    content: String,
    likedCount: Number,
    // denormalized approach
    user: {
        // whenever we store objects, mongoose tries to create its own id
        _id: mongoose.Types.ObjectId,
        name: String,
        image: String,
        about: String,
        followerCount: Number,
    },
});

const postModel = mongoose.model('Post', postSchema, 'posts')

export default postModel;