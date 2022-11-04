
import fs from 'fs';

// const employees = [{
//     "name": "Abhishek Mathur",
//     "designation": "Software Developer",
//     "employeeId": 1,
//     "department": "technology"
// }];


function readAllEmployees() {
    const allEmployees = fs.readFileSync('./employees.json', {
        encoding: 'utf-8'
    });

    return JSON.parse(allEmployees);
}

function writeAllEmployees(employees) {
    const data = JSON.stringify(employees, null, 2);

    fs.writeFileSync('./employees.json', data, {
        encoding: 'utf-8'
    })
}

/**
 * 
 * READ -> Read from file -> array of employees
 * ADD -> We read from file, we insert item in the array, then we write back to disk
 * DELETE -> We read from file, we remote item from the array, we write the update array back to disk
 */

export function getEmployee(id) {
    // implementation

    const employees = readAllEmployees();

    // throw new Error('Dummy error') // demo bad network call to data store
    const employee = employees.find(employee => employee.employeeId === id)

    return employee
}

export function addEmployee(data) {

    const employees = readAllEmployees();

    let maxAvailableId = 0;

    for (const employee of employees) {
        if (maxAvailableId < employee.employeeId) {
            maxAvailableId = employee.employeeId;
        }
    }

    let {
        name,
        designation,
        department
    } = data;

    let employee = {
        name, designation, department,
        employeeId: maxAvailableId + 1
    }

    employees.push(employee);

    writeAllEmployees(employees);

    return employee;
}

export function deleteEmployee(id) {

    const employees = readAllEmployees();

    let idx = null

    employees.forEach((employee, index) => {
        if (employee.employeeId === id) {
            idx = index
        }
    })

    if (idx === null) {

    } else {
        const employee = employees.splice(idx, 1);

        writeAllEmployees(employees);
        return employee;
    }

}

export function getAllEmployees() {
    const employees = readAllEmployees();
    return employees;
}