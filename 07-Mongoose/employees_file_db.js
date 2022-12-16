
const fs = require('fs/promises');

async function readEmployeesData() {
    const result = await fs.readFile('./employees.json', {
        encoding: 'utf8'
    });

    const employees = JSON.parse(result);

    return employees;
}

async function writeEmployeesData(employee) {
    const data = JSON.stringify(employee, null, 2);

    await fs.writeFile('./employees.json', data);
}

async function getAllEmployees() {

    const employees = await readEmployeesData();

    return employees;
}

async function getEmployeeById(id) {
    const employees = await readEmployeesData();
    return employees.find(employee => employee.id == id);
}

async function addEmployee(employeeData) {
    // find the max id
    // new id = max + 1 // employees.length + 1 will have logical errors

    let employees = await readEmployeesData();

    let max = 0;

    employees.forEach(employee => {
        if (max < employee.id) {
            max = employee.id;
        }
    })

    let newId = max + 1;

    const newEmployee = {
        ...employeeData,
        id: newId
    }


    employees.push(newEmployee);

    await writeEmployeesData(employees);

    return newEmployee;
}

async function deleteEmployeeById(id) {

    let employees = await readEmployeesData();

    let index = -1;

    employees.forEach((employee, i) => {
        if (id == employee.id) {
            index = i;
        }
    })

    let deletedEmployeeDetails;
    if (index !== -1) {
        let result = employees.splice(index, 1);

        await writeEmployeesData(employees);

        if (result.length) {
            deletedEmployeeDetails = result[0];
        }
    }

    return deletedEmployeeDetails;
}

async function updateEmployeeDataById(id, employeeData) {

    let employees = await readEmployeesData();

    let index = -1;

    employees.forEach((employee, i) => {
        if (id == employee.id) {
            index = i;
        }
    });

    if (index !== -1) {
        employees[index] = {
            ...employees[index],
            ...employeeData
        };


        await writeEmployeesData(employees);

        return employees[index];
    }
}


module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployeeDataById,
    deleteEmployeeById
}