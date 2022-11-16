
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({ // Class
    name: {
        type: String,
        // other metadata about this field
        required: true, // This can't be empty
        minLength: 4, // related to strings only
        maxLength: 40,
    },
    password: {
        type: String,
        required: true,
        select: false, // by default it will not select while reading
    },
    email: {
        type: String,
        required: true,
    },
    about: String,
    dob: {
        type: Date,
    },
    image: String,
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    followerCount: {
        type: Number,
        default: 0,
    },
})

const userModel = mongoose.model('User', userSchema, 'users') // 'User' -> 'users'

export default userModel;