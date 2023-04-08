
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    image: String,
    gender: String,
    authMode: String, // github, email_password
    githubUsername: String,
    dateOfBirth: {
        type: Date,
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema) // users

module.exports = User