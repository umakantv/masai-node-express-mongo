
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: String,
    gender: String,
    password: String,
    image: String,
    phone: String, // '+91 34 2323-2323'
    dateOfBirth: Date,

}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
