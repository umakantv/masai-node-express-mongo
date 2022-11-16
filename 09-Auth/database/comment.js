
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({ // Class
    content: String,

    // normalized approach - store the id as ObjectId
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post', // the object id that we are store refers to the User model we have created
    },

    // denormalized approach
    user: {
        _id: mongoose.Types.ObjectId,
        name: String,
        image: String,
    },
}, {
    timestamps: true // manage createdAt, updatedAt automatically
});

const commentModel = mongoose.model('Comment', commentSchema, 'comments')

export default commentModel;