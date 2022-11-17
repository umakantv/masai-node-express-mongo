const mongoose = require("mongoose");

// Step 2. Define the Schema
const userSchema = new mongoose.Schema({
    name: String,
    // gender: String, // shorthand definition
    gender: {
        type: String,
        // required: true,
        enum: ['Male', 'Female', 'Other']
    },
    image: String,
    username: String,
    email: {
        type: String,
        // required: true,
    },
    authType: {
        type: String,
        enum: ['github', 'google', 'facebook', 'email-password'],
        defaultValue: 'email-password'
    },
    password: {
        type: String,
        // required: true,
        minLength: 8
    },
})

// Step 3. Create a model using the schema related to the collection
const userModel = mongoose.model('users', userSchema) // users

module.exports = userModel;