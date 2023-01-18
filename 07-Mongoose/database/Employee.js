
const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
    // name: String, // short-hand
    name: {
        type: String,
        required: true, // works during create, will not allow empty values
        minLength: 4,
        trim: true
    },
    gender: String,
    designation: String,
    dateOfBirth: Date,
    dateOfJoining: Date,
    hobbies: [String],
    profileImage: String,
    isMarried: Boolean,
    isVisuallyImpared: Boolean,
    phone: String,
    email: String,
    password: String,
})

module.exports = {
    Employee
}