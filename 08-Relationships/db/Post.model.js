import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: String,
    content: String,
    author: {
        userId: String,
        name: String,
        image: String,
    }
}, {
    timestamps: true,
})

const PostModel = model('Post', PostSchema, 'posts')

export default PostModel;