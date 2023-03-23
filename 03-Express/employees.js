
const fs = require('fs')

const EMPLOYEE_FILE = 'employees.json'

async function getEmployeesData() {

    const content = fs.readFileSync(EMPLOYEE_FILE, {
        encoding: 'utf-8'
    })

    const employees = JSON.parse(content)

    return employees;
}

async function findEmployeeById(id) {
    const employees = await getEmployeesData()

    const employee = employees.find(employee => employee.id === id)

    return employee
}

async function writeUpdatedEmployeesToFile(employees) {
    const content = JSON.stringify(employees, null, 4);

    fs.writeFileSync(EMPLOYEE_FILE, content, {
        encoding: 'utf-8'
    })
}

async function addEmployee(data) {
    const employees = await getEmployeesData()

    let max = 0;

    for (const employee of employees) {
        max = Math.max(employee.id, max);
    }

    let newEmployee = {
        id: max + 1,
        name: data.name,
        designation: data.designation,
        gender: data.gender,
        date_of_joining: data.date_of_joining,
    }

    employees.push(newEmployee);

    writeUpdatedEmployeesToFile(employees);

    return newEmployee;
}

async function updateEmployeeById(id, data) {

    const employees = await getEmployeesData()

    let index = -1;

    let employee = employees.find((employee, idx) => {
        if (employee.id === id) {
            index = idx;
            return true;
        }
    });

    if (index === -1) {
        return null;
    }

    const { designation, date_of_joining } = data;

    if (date_of_joining) {
        employee.date_of_joining = date_of_joining
    }

    if (designation) {
        employee.designation = designation
    }

    employees[index] = employee;

    writeUpdatedEmployeesToFile(employees);

    return employee;
}

async function deleteEmployeeById(id) {

    const employees = await getEmployeesData()

    let index = -1;

    let employee = employees.find((employee, idx) => {
        if (employee.id === id) {
            index = idx;
            return true;
        }
    });

    if (index === -1) {
        return null;
    }

    employees.splice(index, 1);

    writeUpdatedEmployeesToFile(employees);

    return employee;

}


module.exports = {
    getEmployeesData,
    findEmployeeById,
    addEmployee,
    updateEmployeeById,
    deleteEmployeeById,
}