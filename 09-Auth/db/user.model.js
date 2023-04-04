
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    gender: String,
    dateOfBirth: {
        type: Date,
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema) // users

module.exports = User