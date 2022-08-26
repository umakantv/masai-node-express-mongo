const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    githubUsername: String,
    image: String,
    password: { // will be empty for oauth users
        type: String,
        select: false // by default, this field will be skipped while fetching from db 
    },
    authType: {
        type: String,
        required: true,
        default: "email-password", // google-oauth, github-oauth
        enum: ["email-password", "google-oauth", "github-oauth"],
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;