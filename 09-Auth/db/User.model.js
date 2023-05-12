import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    gender: String,
    email: String,
    password: String,
    authMode: {
        type: String,
        default: 'email',
    }, // email, github, google, facebook
    githubUsername: String,
    image: String,
}, {
    timestamps: true,
})

const UserModel = model('User', UserSchema, 'users')

export default UserModel;