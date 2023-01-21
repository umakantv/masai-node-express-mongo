
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // _id: ObjectId
    name: String,
    email: String,
    password: String,
    gender: String,
    image: String,
    githubUsername: String,
    signinMethod: String, // 'email-password', 'github-oauth', 'google-oauth'
    // createdAt
    // updatedAt - latest timestamp when the object was updated
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema) // collection - users

module.exports = {
    User
}