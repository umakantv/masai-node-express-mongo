const mongoose = require("mongoose");

// Step 2. Define the Schema
const userSchema = new mongoose.Schema({
    name: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    image: String,
    username: String,
    githubUsername: String,
    email: {
        type: String,
    },
    authType: {
        type: String,
        enum: ['github', 'google', 'facebook', 'email-password'],
        defaultValue: 'email-password'
    },
    blogsCount: Number,
    followingCount: Number,
    followerCount: Number,
    password: {
        type: String,
        minLength: 8
    },
})

// Step 3. Create a model using the schema related to the collection
const userModel = mongoose.model('users', userSchema) // users

module.exports = userModel;