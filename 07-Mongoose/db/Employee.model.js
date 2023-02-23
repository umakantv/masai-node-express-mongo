const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    // name: String, //shorthand
    name: {
        type: String,
        required: true,
        minLength: 10,
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
}, {
    timestamps: true
})

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;