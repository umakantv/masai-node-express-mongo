
const mongoose = require('mongoose')

// We want to make DB queries to a collection - employees
// We have to make a Model class

const EmployeeSchema = new mongoose.Schema({
    // name: String, // Shorthand method to define a schema-field
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    designation: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        min: "1940-01-01",
        validate: (date) => {
            if (date >= new Date("2004-01-01")) {
                return false;
            }
            return true;
        }
    },
    gender: String,
    dateOfJoining: {
        type: Date,
        // required: true,
        // default: new Date(),
    },
    hobbies: {
        type: [String],
        validate: (hobbies) => {
            return hobbies.length;
        }
    },
    profileImage: String,
    isMarried: Boolean,
    isVisuallyImpared: Boolean,
    phone: String,
    email: String,
    // maritalStatus: String,
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    }
}, {
    timestamps: true
    // createdAt
    // udpatedAt
})

const Employees = mongoose.model('employees', EmployeeSchema);

// Employees == db.employees

async function getAllEmployees({
    search, page, pageSize, sortBy, sortOrder
}) {

    let limit = Number(pageSize);
    let skip = Number(pageSize) * (Number(page) - 1);

    const total = await Employees.find({
        designation: search
    }).count();

    const employees = await Employees.find({
        designation: search
    }).skip(skip).limit(limit).sort({
        [sortBy]: sortOrder == 'asc' ? 1 : -1
    });

    return {employees, total};
}

async function getEmployeeById(id) {
    return Employees.findById(id);
}

async function addEmployee(employeeData) {

    let employee = await Employees.create(employeeData);

    employee = await Employees.findById(employee._id)

    return employee;
}

async function deleteEmployeeById(id) {

    let employee = await Employees.findById(id);

    if (employee) {
        // Employees.findByIdAndDelete(id)
        // Employees.deleteOne({
        //     _id: id
        // })
        await employee.delete();

        employee = employee.toJSON();
        delete employee.password;

        return employee;
    } else {
        return null;
    }
}

async function updateEmployeeDataById(id, employeeData) {

    let employee = await Employees.findById(id);

    if (employee) {

        for (const [key, value] of Object.entries(employeeData)) {
            employee[key] = value;
        }

        // await employee.update({
        //     $set: employeeData
        // });

        await employee.save();

        employee = employee.toJSON();
        delete employee.password;

        return employee;
    } else {
        return null;
    }
}

module.exports = {
    Employees,
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployeeDataById,
    deleteEmployeeById
}