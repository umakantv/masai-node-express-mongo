
const fs = require('fs/promises')

async function getAllEmployees() {
    let employees = await fs.readFile('./employees.json', {
        encoding: 'utf-8'
    });

    employees = JSON.parse(employees);

    return employees;
}

async function updateEmployeesFile(employees) {

    employees = JSON.stringify(employees, null, 2);

    await fs.writeFile('./employees.json', employees);
}

async function addEmployee(data) {
    const employees = await getAllEmployees();

    let id = 1;

    for (const employee of employees) {
        if (employee.id >= id) {
            id = employee.id + 1;
        }
    }

    data.id = id;
    
    employees.push(data);

    await updateEmployeesFile(employees);

    return data;
}

async function updateEmployee(id, data) {

    const employees = await getAllEmployees();

    let index = -1;

    employees.forEach((employee, i) => {
        if (employee.id === id) {
            index = i;
        }
    });

    if (index === -1) {
        return -1;
    } else {
        let employee = employees[index];

        employee = {
            ...employee,
            ...data
        }

        employees[index] = employee;

        await updateEmployeesFile(employees);

        return employee;
    }
    
}

async function removeEmployee(id) {

    const employees = await getAllEmployees();

    let index = -1;

    employees.forEach((employee, i) => {
        if (employee.id === id) {
            index = i;
        }
    });

    if (index === -1) {
        return -1;
    } else {
        
        const removedEmployee = employees.splice(index, 1);

        await updateEmployeesFile(employees);

        return removedEmployee;
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    removeEmployee
}