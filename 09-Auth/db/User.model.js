
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    signinMethod: {
        type: String,
        default: 'email-password',
    }, // email-password, github
    githubUsername: String,
    email: String,
    password: String,
    gender: String,
    image: String,
    phone: String, // '+91 34 2323-2323'
    dateOfBirth: Date,

}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
