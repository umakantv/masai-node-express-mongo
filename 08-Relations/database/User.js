
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // _id: ObjectId
    name: String,
    email: String,
    username: String,
    gender: String,
    password: String,
    image: String,
    // createdAt
    // updatedAt - latest timestamp when the object was updated
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema) // collection - users

module.exports = {
    User
}