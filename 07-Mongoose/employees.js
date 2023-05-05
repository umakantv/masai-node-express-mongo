
import mongoose from "mongoose";

export async function connectDatabase() {
    await mongoose.connect('mongodb://127.0.0.1:27017/employees')

    console.log('Connected to database');
}

const EmployeeSchema = new mongoose.Schema({
    // name: String, // shorthand definition
    name: { // detailed definition
        type: String,
        required: true, // will throw error if not provided while creating
        minLength: 5, // "ram" error
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        lowercase: true
    },
    dateOfBirth: Date,
    dateOfJoining: Date,
    designation: String,
    department: String,
    experience: Number,
}, {
    timestamps: true
    // createdAt
    // updatedAt
})

const Employee = mongoose.model('Employee', EmployeeSchema, 'employees')

export async function getAllEmployees() {

    return Employee.find();
}

export async function getEmployeeById(id) {

    return Employee.findById(id);
}

export async function addEmployee(employee) {

    return Employee.create(employee);
}

export async function udpateEmployeeById(id, data) {
    
    // first does a findById and then calls update
    // hence the employee object is not updated data
    let employee = await Employee.findByIdAndUpdate(id, {
        $set: data
    });

    console.log('Non updated employee', employee)

    employee = await Employee.findById(id);

    console.log('Updated employee', employee)

    return employee;
}

export async function deleteEmployeeById(id) {

    return Employee.findByIdAndDelete(id);
}