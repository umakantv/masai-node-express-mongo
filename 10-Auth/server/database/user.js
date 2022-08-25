const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: {
        type: String,
        select: false
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