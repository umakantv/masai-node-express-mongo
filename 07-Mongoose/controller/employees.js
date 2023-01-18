const { Employee } = require("../database/Employee")


// Needs to be paginated later on
async function getAllEmployees({
    skip = 0,
    limit = 20,
}) {
    // Count
    // Skip, limit
    const employees = await Employee.find().skip(skip).limit(limit);

    return employees;
}

async function addEmployee(data) {
    const employee = await Employee.create({
        ...data,
    })

    return employee;
}

async function udpateEmployeeById(id, data) {

    const {name, dateOfBith, hobbies, profileImage} = data;

    await Employee.findByIdAndUpdate(id, {
        $set: {name, dateOfBith, hobbies, profileImage}
    });

    const updatedEmployee = await Employee.findById(id);

    return updatedEmployee;
}

async function deleteEmployeeById(id) {

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    return deletedEmployee;
}

module.exports = {
    getAllEmployees,
    addEmployee,
    udpateEmployeeById,
    deleteEmployeeById,
}