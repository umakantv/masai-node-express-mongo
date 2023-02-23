
const fs = require('fs/promises');
const Employee = require('./db/Employee.model');

async function getAllEmployees() {
    const employees = await Employee.find()

    return employees;
}

async function addEmployee(data) {
    const employee = await Employee.create(data);
    return employee;
}

async function updateEmployee(id, data) {

    let employee = await Employee.findByIdAndUpdate(id, {
        $set: data
    })

    if (employee) {

        employee = await Employee.findById(id);
        return employee;
    } else {
        return -1;
    }
}

async function removeEmployee(id) {

    const employee = await Employee.findByIdAndDelete(id);

    if (employee) {
        return employee;
    } else {
        return -1;
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee
}