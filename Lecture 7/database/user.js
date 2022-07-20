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
        default: "email-password"
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