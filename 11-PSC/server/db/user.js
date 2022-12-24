
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    authType: String, // 'email-password', 'github', 'google', 'facebook'
    githubUsername: String,
    postCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}