
const fs = require('fs')

const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    date_of_joining: String,
}, {
    timestamps: true
    // createdAt
    // udpatedAt
})

// connect to "employees" collection
const Employee = mongoose.model('Employee', employeeSchema)

async function connectDatabase() {
    // If the database does not exist - it will be created for us
    await mongoose.connect('mongodb://127.0.0.1:27017/pt-web-9-employee')

    console.log('Connected to DB')
}

async function getEmployeesData() {

    const employees = await Employee.find();

    return employees;
}

async function findEmployeeById(id) {

    const employee = await Employee.findById(id);

    return employee
}

async function addEmployee(data) {

    let newEmployee = await Employee.create({
        name: data.name,
        designation: data.designation,
        gender: data.gender,
        date_of_joining: data.date_of_joining,
    })

    return newEmployee;
}

async function updateEmployeeById(id, data) {

    const { designation, date_of_joining } = data;
    let updateFields = {}

    if (designation) {
        updateFields.designation = designation
    }

    if (date_of_joining) {
        updateFields.date_of_joining = date_of_joining
    }

    let employee = await Employee.findByIdAndUpdate(id, {
        $set: updateFields
    });

    if (employee == null) {
        return null;
    }

    employee = await Employee.findById(id);

    return employee;
}

async function deleteEmployeeById(id) {

    const employee = await Employee.findByIdAndDelete(id)

    return employee;

}


module.exports = {
    connectDatabase,
    getEmployeesData,
    findEmployeeById,
    addEmployee,
    updateEmployeeById,
    deleteEmployeeById,
}