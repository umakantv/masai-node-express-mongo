const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verifiedEmail: Boolean,
    verifyEmailOtp: Number,
}, {
    timestamps: true
})

const User = mongoose.model('User', schema);

module.exports = User;